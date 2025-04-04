import Product from '../models/product.js';
import Seller from '../models/seller.js';
import Category from '../models/category.js';
import ProductMedia from '../models/productMedia.js';
import { Op } from 'sequelize';
import { deleteFile } from '../utils/fileUpload.js';

// get all active products (public)
export const getAllProducts = async (req, res) => {
    try {
        const { category, search, min_price, max_price, sort_by } = req.query;
        
        // build query filters
        const filters = {
            is_active: true, // Only return active products
        };

        // Add category filter if provided
        if (category) {
            filters.category_id = category;
        }

        // Add price range filters if provided
        if (min_price || max_price) {
            filters.price = {};
            if(min_price) filters.price[Op.gte] = parseFloat(min_price);
            if(max_price) filters.price[Op.lte] = parseFloat(max_price);
        }

        // Add search filter if provided
        if (search) {
            filters[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        // Define sorting options
        let order = [['createdAt', 'DESC']]; // Default sort by newest
        if (sort_by === 'price_low') {
            order = [['price', 'ASC']];
        } else if (sort_by === 'price_high') {
            order = [['price', 'DESC']];
        } else if (sort_by === 'name') {
            order = [['name', 'ASC']];
        }

        const products = await Product.findAll({
            where: filters,
            include: [
                {
                    model: Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: Seller,
                    attributes: ['id', 'business_name', 'profile_image']
                },
                {
                    model: ProductMedia,
                    required: false,
                    limit: 1, // only get 1 image for product thumbnail
                    order: [['sort_order', 'ASC']]
                }
            ],
            order
        });

        // Add full URLs for images
        const productsWithImageUrls = products.map(product => {
            const productJson = product.toJSON();
            
            // Process product media
            if (productJson.ProductMedia && productJson.ProductMedia.length > 0) {
                productJson.ProductMedia = productJson.ProductMedia.map(media => ({
                    ...media,
                    imageUrl: `${req.protocol}://${req.get('host')}/${media.file_path.replace(/\\/g, '/')}`
                }));
            }
            
            // Process seller profile image
            if (productJson.Seller && productJson.Seller.profile_image) {
                productJson.Seller.profileImageUrl = `${req.protocol}://${req.get('host')}/${productJson.Seller.profile_image.replace(/\\/g, '/')}`;
            }
            
            return productJson;
        });

        res.json(productsWithImageUrls);
    } catch (error) {
        console.error('Error fetching products: ', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

// Get a product by ID (public)
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: {
                id, 
                is_active: true
            },
            include: [
                {
                    model: Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: Seller,
                    attributes: ['id', 'business_name', 'about_us_description', 
                                'indigenous_verification_status', 'profile_image']                    
                },
                {
                    model: ProductMedia,
                    order: [['sort_order', 'ASC']]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add full URLs for images
        const productJson = product.toJSON();
        
        // Process product media
        if (productJson.ProductMedia && productJson.ProductMedia.length > 0) {
            productJson.ProductMedia = productJson.ProductMedia.map(media => ({
                ...media,
                imageUrl: `${req.protocol}://${req.get('host')}/${media.file_path.replace(/\\/g, '/')}`
            }));
        }
        
        // Process seller profile image
        if (productJson.Seller && productJson.Seller.profile_image) {
            productJson.Seller.profileImageUrl = `${req.protocol}://${req.get('host')}/${productJson.Seller.profile_image.replace(/\\/g, '/')}`;
        }

        res.json(productJson);
    } catch (error) {
        console.error('Error fetching product: ', error);
        res.status(500).json({ error: 'Failed to fetch product', details: error.message });
    }
};

// Create a new product (protected - seller only)
export const createProduct = async (req, res) => {
    const {
        name, 
        description,
        price,
        quantity,
        category_id,
        is_active = true
    } = req.body;

    try {
        // check if user is a seller
        const seller = await Seller.findOne({ where: { user_id: req.user.id } });
        if (!seller) {
            return res.status(403).json({ message: 'Only sellers can create product listings' });
        }

        // check if category exists
        if (category_id) {
            const categoryExists = await Category.findByPk(category_id);
            if (!categoryExists) {
                return res.status(400).json({ message: 'Invalid category' });
            }
        }

        // Create the product listing
        const newProduct = await Product.create({
            seller_id: seller.id,
            name,
            description,
            price,
            quantity,
            category_id,
            is_active
        });

        // Return the created product
        const createdProduct = await Product.findByPk(newProduct.id);

        res.status(201).json({
            message: "Product created successfully",
            product: createdProduct,
            // Return upload instructions to the client
            uploadInstructions: `To upload images for this product, send a POST request to /api/products/${newProduct.id}/images with form-data containing 'image' field`
        });
    } catch (error) {
        console.error('Error creating product: ', error);
        res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
};

// Update a product (protected - seller only)
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { 
      name, 
      description, 
      price, 
      quantity, 
      category_id,
      is_active
    } = req.body;
    
    try {
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Check if user is the seller of this product or an admin
      const seller = await Seller.findOne({ where: { user_id: req.user.id } });
      if ((!seller || seller.id !== product.seller_id) && req.user.user_type !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to update this product' });
      }
      
      // Check if category exists and if it's being updated
      if (category_id) {
        const categoryExists = await Category.findByPk(category_id);
        if (!categoryExists) {
          return res.status(400).json({ message: 'Invalid category' });
        }
      }
      
      // Update the product
      await product.update({
        name,
        description,
        price,
        quantity,
        category_id,
        is_active
      });
      
      // Return the updated product
      const updatedProduct = await Product.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: ['id', 'category_name']
          },
          {
            model: ProductMedia,
            order: [['sort_order', 'ASC']]
          }
        ]
      });
      
      // Add full URLs for images
      const productJson = updatedProduct.toJSON();
      
      if (productJson.ProductMedia && productJson.ProductMedia.length > 0) {
        productJson.ProductMedia = productJson.ProductMedia.map(media => ({
          ...media,
          imageUrl: `${req.protocol}://${req.get('host')}/${media.file_path.replace(/\\/g, '/')}`
        }));
      }
      
      res.json(productJson);
    } catch (error) {
      console.error('Error updating product: ', error);
      res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
};

// Delete a product (protected - seller only)
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Check if user is the seller of this product or an admin
      const seller = await Seller.findOne({ where: { user_id: req.user.id } });
      if ((!seller || seller.id !== product.seller_id) && req.user.user_type !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to delete this product' });
      }
      
      // Find all associated images
      const productImages = await ProductMedia.findAll({
        where: { product_id: id }
      });

      // Delete all images from filesystem
      for (const image of productImages) {
        deleteFile(image.file_path);
      }
      
      // Delete the product (will cascade delete media entries in DB)
      await product.destroy();
      
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product: ', error);
      res.status(500).json({ error: 'Failed to delete product', details: error.message });
    }
};

// Get seller's products (protected - seller only)
export const getSellerProducts = async (req, res) => {
    try {
      // Check if user is a seller
      const seller = await Seller.findOne({ where: { user_id: req.user.id } });
      if (!seller) {
        return res.status(403).json({ message: 'Seller profile not found' });
      }
      
      const products = await Product.findAll({
        where: { seller_id: seller.id },
        include: [
          {
            model: Category,
            attributes: ['id', 'category_name']
          },
          {
            model: ProductMedia,
            limit: 1,
            order: [['sort_order', 'ASC']]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      
      // Add full URLs for images
      const productsWithImageUrls = products.map(product => {
        const productJson = product.toJSON();
        
        if (productJson.ProductMedia && productJson.ProductMedia.length > 0) {
          productJson.ProductMedia = productJson.ProductMedia.map(media => ({
            ...media,
            imageUrl: `${req.protocol}://${req.get('host')}/${media.file_path.replace(/\\/g, '/')}`
          }));
        }
        
        return productJson;
      });
      
      res.json(productsWithImageUrls);
    } catch (error) {
      console.error('Error fetching seller products: ', error);
      res.status(500).json({ error: 'Failed to fetch seller products', details: error.message });
    }
};
