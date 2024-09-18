import mongoose from 'mongoose';
import Category from './categoryModel.js'; // Ensure the correct path

// Connect to MongoDB
mongoose.connect('mongodb+srv://navneet709123:YaCbrYbPOyrsxY1g@cluster1.kkpzfbb.mongodb.net/intelli-software?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    return insertCategories();
  })
  .catch(err => {
    console.error('Connection error', err);
  });

// Function to insert multiple categories
const insertCategories = async () => {
  const categories = [
    // { name: 'Technology', description: 'Posts about the latest in tech' },
    // { name: 'Health & Wellness', description: 'Tips on staying healthy and fit' },
    // { name: 'Travel', description: 'Exploring the world and travel guides' },
    // { name: 'Food & Recipes', description: 'Delicious recipes and food trends' },
    // { name: 'Personal Finance', description: 'Financial advice and money management' },
    // { name: 'Lifestyle', description: 'Fashion, home decor, and life tips' },
    // { name: 'Business & Entrepreneurship', description: 'Startup tips and business growth advice' },
    { name: 'Programming', description: 'Posts related to programming languages, tools, and techniques' }
  ];

  try {
    await Category.insertMany(categories);
    console.log('Categories inserted successfully');
  } catch (error) {
    console.error('Error inserting categories:', error);
  } finally {
    mongoose.connection.close();
  }
};
