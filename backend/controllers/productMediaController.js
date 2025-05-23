import ProductMedia from '../models/productMedia.js';
import Product from '../models/product.js';
import Seller from '../models/seller.js';
import { deleteFile } from '../utils/fileUpload.js';

// Add media to a product (protected - seller only)
export const addProductMedia = async (req, res) => {
  try {
    const { product_id } = req.body;
    
    // Check if product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      // Delete the uploaded file if product doesn't exist
      if (req.file) {
        deleteFile(req.file.path);
      }
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if user is the seller of this product
    const seller = await Seller.findOne({ where: { user_id: req.user.id } });
    if (!seller || seller.id !== product.seller_id) {
      // Delete the uploaded file
      if (req.file) {
        deleteFile(req.file.path);
      }
      return res.status(403).json({ message: 'You are not authorized to add media to this product' });
    }
    
    // Get the current highest sort order for this product
    const lastMedia = await ProductMedia.findOne({
      where: { product_id },
      order: [['sort_order', 'DESC']]
    });
    
    const sortOrder = lastMedia ? lastMedia.sort_order + 1 : 0;
    
    // Create the media entry
    const newMedia = await ProductMedia.create({
      product_id,
      file_name: req.file.filename,
      file_path: req.file.path,
      original_name: req.file.originalname,
      media_type: 'image',
      sort_order: sortOrder,
      file_size: req.file.size,
      mime_type: req.file.mimetype
    });
    
    res.status(201).json({
      message: 'Product image uploaded successfully',
      data: newMedia
    });
  } catch (error) {
    // Delete the uploaded file if there's an error
    if (req.file) {
      deleteFile(req.file.path);
    }
    console.error('Error adding product media: ', error);
    res.status(500).json({ error: 'Failed to add product media', details: error.message });
  }
};

// Delete media from a product (protected - seller only)
export const deleteProductMedia = async (req, res) => {
  const { id } = req.params;
  
  try {
    const media = await ProductMedia.findByPk(id);
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Check if the product associated with the media exists
    const product = await Product.findByPk(media.product_id);
    if (!product) {
      return res.status(404).json({ message: 'Associated product not found' });
    }
    
    // Check if user is the seller of this product
    const seller = await Seller.findOne({ where: { user_id: req.user.id } });
    if ((!seller || seller.id !== product.seller_id) && req.user.user_type !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this media' });
    }
    
    // Delete the file from filesystem
    deleteFile(media.file_path);
    
    // Delete the media record
    await media.destroy();
    
    res.json({ message: 'Product media deleted successfully' });
  } catch (error) {
    console.error('Error deleting product media: ', error);
    res.status(500).json({ error: 'Failed to delete product media', details: error.message });
  }
};

// Update media sort order (protected - seller only)
export const updateMediaSortOrder = async (req, res) => {
  const { media_items } = req.body; // Array of {id, sort_order} objects
  
  if (!Array.isArray(media_items) || media_items.length === 0) {
    return res.status(400).json({ message: 'Invalid media items array' });
  }
  
  try {
    // Get the first media item to check authorization
    const firstMediaId = media_items[0].id;
    const firstMedia = await ProductMedia.findByPk(firstMediaId);
    
    if (!firstMedia) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Check if user is the seller of the product
    const product = await Product.findByPk(firstMedia.product_id);
    const seller = await Seller.findOne({ where: { user_id: req.user.id } });
    
    if ((!seller || seller.id !== product.seller_id) && req.user.user_type !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to update this product media' });
    }
    
    // Update each media item's sort order
    const updatePromises = media_items.map(item => 
      ProductMedia.update(
        { sort_order: item.sort_order },
        { where: { id: item.id, product_id: firstMedia.product_id } }
      )
    );
    
    await Promise.all(updatePromises);
    
    // Get updated media items
    const updatedMedia = await ProductMedia.findAll({
      where: { product_id: firstMedia.product_id },
      order: [['sort_order', 'ASC']]
    });
    
    res.json(updatedMedia);
  } catch (error) {
    console.error('Error updating media sort order: ', error);
    res.status(500).json({ error: 'Failed to update media sort order', details: error.message });
  }
};
