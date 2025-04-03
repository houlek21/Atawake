import Seller from "../models/seller.js";
import { deleteFile } from "../utils/fileUpload.js";

// Get all sellers (public)
export const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.findAll();
        
        // Add profile image URLs
        const sellersWithImageUrls = sellers.map(seller => {
            const sellerJson = seller.toJSON();
            
            if (sellerJson.profile_image) {
                sellerJson.profileImageUrl = `${req.protocol}://${req.get('host')}/${sellerJson.profile_image.replace(/\\/g, '/')}`;
            }
            
            return sellerJson;
        });
        
        res.json(sellersWithImageUrls);
    } catch (error) {
        console.error('Error fetching sellers: ', error);
        res.status(500).json({ error: 'Failed to fetch sellers', details: error.message });
    }
};

// Get a specific seller by ID (public)
export const getSellerById = async (req, res) => {
    const { id } = req.params;

    try {
        const seller = await Seller.findByPk(id);
        if(!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        
        const sellerJson = seller.toJSON();
        
        // Add profile image URL if it exists
        if (sellerJson.profile_image) {
            sellerJson.profileImageUrl = `${req.protocol}://${req.get('host')}/${sellerJson.profile_image.replace(/\\/g, '/')}`;
        }
        
        res.json(sellerJson);
    } catch (error) {
        console.error('Error fetching seller: ', error);
        res.status(500).json({ error: 'Failed to fetch seller', details: error.message });
    }
};

// -- M
export const getSellerByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const seller = await Seller.findOne({
            
            where: {
              user_id: id,
            },
        });
        console.log(seller)

        if (!seller) {
            return res.status(400).json({ message: 'Seller not found ' });
        }
        res.json(seller);
    } catch (error) {
        console.error('Error fetching seller: ', error);
        res.status(500).json({ error: 'Failed to fetch seller', details: error.message });
    }
};

// Register a seller profile (protected)
export const registerSellerProfile = async (req, res) => {
    const { business_name, contact_person, business_phone, business_address, about_us_description } = req.body;
    const user_id = req.user.id; // Logged-in user ID from JWT

    try{
        // check if the user already has a seller profile
        const existingSeller = await Seller.findOne({ where: {user_id} });
        if(existingSeller) {
            return res.status(400).json({ message: 'User already has a seller profile' });
        }

        // create new seller profile entry
        const newSeller = await Seller.create({
            user_id,
            business_name,
            contact_person,
            business_phone,
            business_address,
            about_us_description,
        });

        res.status(201).json({ 
            message: 'Seller profile successfully registered',
            seller: newSeller
        });
    } catch (error) {
        console.error('Error registering seller profile: ', error);
        res.status(500).json({ error: 'Failed to register seller profile', details: error.message });
    }
};

// Update seller details (protected)
export const updateSeller = async (req, res) => {
    const { id } = req.params;
    const { business_name, contact_person, business_phone, business_address, about_us_description } = req.body;

    try {
        const seller = await Seller.findByPk(id);
        if(!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Ensure only the seller or an admin can update the profile
        if(req.user.id !== seller.user_id && req.user.user_type !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to update this seller profile' });
        }

        await seller.update({ business_name, contact_person, business_phone, business_address, about_us_description });

        const updatedSeller = seller.toJSON();
        
        // Add profile image URL if it exists
        if (updatedSeller.profile_image) {
            updatedSeller.profileImageUrl = `${req.protocol}://${req.get('host')}/${updatedSeller.profile_image.replace(/\\/g, '/')}`;
        }

        res.json({ 
            message: 'Seller profile updated successfully', 
            seller: updatedSeller 
        });
    } catch (error) {
        console.error('Error updating seller: ', error);
        res.status(500).json({ error: 'Failed to update seller', details: error.message });
    }
};

// Upload profile image (protected)
export const uploadProfileImage = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verify that the seller exists
        const seller = await Seller.findByPk(id);
        if (!seller) {
            // Delete the uploaded file if seller doesn't exist
            if (req.file) {
                deleteFile(req.file.path);
            }
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Ensure only the seller or an admin can update the profile image
        if(req.user.id !== seller.user_id && req.user.user_type !== 'admin') {
            // Delete the uploaded file
            if (req.file) {
                deleteFile(req.file.path);
            }
            return res.status(403).json({ message: 'You are not authorized to update this seller profile' });
        }

        // Delete previous profile image if it exists
        if (seller.profile_image) {
            deleteFile(seller.profile_image);
        }

        // Update seller with new profile image
        seller.profile_image = req.file.path;
        seller.profile_image_original_name = req.file.originalname;
        await seller.save();

        return res.status(200).json({ 
            message: 'Profile image updated successfully',
            data: {
                profile_image: seller.profile_image,
                profile_image_original_name: seller.profile_image_original_name,
                profileImageUrl: `${req.protocol}://${req.get('host')}/${seller.profile_image.replace(/\\/g, '/')}`
            }
        });
    } catch (error) {
        // Delete the uploaded file if there's an error
        if (req.file) {
            deleteFile(req.file.path);
        }
        console.error('Error uploading seller profile image:', error);
        return res.status(500).json({ message: 'Failed to upload profile image', error: error.message });
    }
};

// Delete profile image (protected)
export const deleteProfileImage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const seller = await Seller.findByPk(id);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        
        // Ensure only the seller or an admin can delete the profile image
        if(req.user.id !== seller.user_id && req.user.user_type !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to update this seller profile' });
        }
        
        // Delete the file from filesystem if it exists
        if (seller.profile_image) {
            deleteFile(seller.profile_image);
            
            // Remove profile image from seller record
            seller.profile_image = null;
            seller.profile_image_original_name = null;
            await seller.save();
        }
        
        return res.status(200).json({ message: 'Profile image deleted successfully' });
    } catch (error) {
        console.error('Error deleting seller profile image:', error);
        return res.status(500).json({ message: 'Failed to delete profile image', error: error.message });
    }
};

// Delete a seller profile (protected)
export const deleteSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const seller = await Seller.findByPk(id);
        if(!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // ensure only the seller or an admin can delete the profile
        if(req.user.id !== seller.user_id && req.user.user_type !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this seller profile' });
        }

        // Delete profile image if it exists
        if (seller.profile_image) {
            deleteFile(seller.profile_image);
        }

        // TO-DO: check for active listings before deleting

        await seller.destroy();
        res.json({ message: 'Seller profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting seller: ', error);
        res.status(500).json({ error: 'Failed to delete seller', details: error.message });
    }
};
