import Category from '../models/category.js';









//CREATE CATAGORYS  delete when not needed

async function catcreate(){

console.log("create");
function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms);
});
}
await sleep(1000);


const categories = await Category.findAll({});

if (categories.length == 0) {
  const newCategory = await Category.create({
    category_name: "Jewelry and Accessories",
    description: "jewls"
  });
  const newCategory2 = await Category.create({
    category_name: "Clothing and Textiles",
    description: "Clothing and Textiles"
  });
  const newCategory3 = await Category.create({
    category_name: "Carvings and Sculptures",
    description: "Carvings and Sculptures"
  });
  const newCategory4 = await Category.create({
    category_name: "Home Decor",
    description: "Home Decor"
  });
  const newCategory5 = await Category.create({
    category_name: "Pottery & Ceramics",
    description: "Pottery & Ceramics"
  });
  const newCategory6 = await Category.create({
    category_name: "Beadwork & Quillwork",
    description: "Beadwork & Quillwork"
  });
}

}


catcreate()







// Get all categories (public)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['category_name', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories: ', error);
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

// Get a category by ID (public)
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Error fetching category: ', error);
    res.status(500).json({ error: 'Failed to fetch category', details: error.message });
  }
};

// Create a new category (admin only)
export const createCategory = async (req, res) => {
  const { category_name, description } = req.body;
  
  try {
    // Check if user is an admin
    if (req.user.user_type !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create categories' });
    }
    
    // Check if category name already exists
    const existingCategory = await Category.findOne({ where: { category_name } });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    
    const newCategory = await Category.create({
      category_name,
      description
    });
    
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category: ', error);
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
};

// Update a category (admin only)
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name, description } = req.body;
  
  try {
    // Check if user is an admin
    if (req.user.user_type !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update categories' });
    }
    
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Check if new category name already exists (if being changed)
    if (category_name && category_name !== category.category_name) {
      const existingCategory = await Category.findOne({ where: { category_name } });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
    }
    
    await category.update({
      category_name,
      description
    });
    
    res.json(category);
  } catch (error) {
    console.error('Error updating category: ', error);
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
};

// Delete a category (admin only)
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Check if user is an admin
    if (req.user.user_type !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete categories' });
    }
    
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    await category.destroy();
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category: ', error);
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};