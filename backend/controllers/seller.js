import Seller from "../models/seller.js";

// Get all sellers (public)
export const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.findAll();
        res.json(sellers);
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
            return res.status(404).json({ message: 'Seller not found '});
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
            return res.status(400).json({ message: 'User already has a seller profile '});
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

        res.status(201).json({ message: 'Seller profile successfully registered' });
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

        res.json({ message: 'Seller profile updated successfully', seller });
    } catch (error) {
        console.error('Error updating seller: ', error);
        res.status(500).json({ error: 'Failed to update seller', details: error.message });
    }
};


// Delete a seller profile (protected)
export const deleteSeller = async (req, res) => {
    const { id } = req.params;

    try{
        const seller = await Seller.findByPk(id);
        if(!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // ensure only the seller or an admin can delete the profile
        if(req.user.id !== seller.user_id && req.user.user_type !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this seller profile' });
        }

        // TO-DO: check for active listings before deleting

        await seller.destroy();
        res.json({ message: 'Seller profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting seller: '. error);
        res.status(500).json({ error: 'Failed to delete seller', details: error.message });
    }
};