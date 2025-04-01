import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Define storage directories
const UPLOADS_DIR = 'uploads';
const PRODUCT_IMAGES_DIR = path.join(UPLOADS_DIR, 'products');
const SELLER_IMAGES_DIR = path.join(UPLOADS_DIR, 'sellers');

// Ensure directories exist
function ensureDirectoriesExist() {
  [UPLOADS_DIR, PRODUCT_IMAGES_DIR, SELLER_IMAGES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

ensureDirectoriesExist();

// Storage configuration for product images
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PRODUCT_IMAGES_DIR);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with original extension
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  }
});

// Storage configuration for seller profile images
const sellerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SELLER_IMAGES_DIR);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with original extension
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  }
});

// File filter to only allow images
const imageFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create multer instances
const uploadProductImage = multer({
  storage: productStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  }
});

const uploadSellerImage = multer({
  storage: sellerStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max file size
  }
});

// Helper function to delete a file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export {
  uploadProductImage,
  uploadSellerImage,
  deleteFile,
  PRODUCT_IMAGES_DIR,
  SELLER_IMAGES_DIR
};