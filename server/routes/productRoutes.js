import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import Product from '../models/Product.js';

const router = express.Router();

function formatProduct(product) {
  return {
    id: product._id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    image: product.image,
    description: product.description,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

router.get('/', async (_request, response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return response.json({ products: products.map(formatProduct) });
  } catch (error) {
    console.error('Fetching products failed:', error);
    return response.status(500).json({ message: 'Unable to load products right now.' });
  }
});

router.post('/', protect, requireAdmin, async (request, response) => {
  try {
    const { name, category, price, rating, stock, image, description } = request.body;

    if (
      !name ||
      !category ||
      price === undefined ||
      rating === undefined ||
      stock === undefined ||
      !image ||
      !description
    ) {
      return response.status(400).json({ message: 'All product fields are required.' });
    }

    const product = await Product.create({
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      rating: Number(rating),
      stock: Number(stock),
      image: image.trim(),
      description: description.trim(),
      createdBy: request.user.userId,
    });

    return response.status(201).json({
      message: 'Product added successfully.',
      product: formatProduct(product),
    });
  } catch (error) {
    console.error('Creating product failed:', error);
    return response.status(500).json({ message: 'Unable to add product right now.' });
  }
});

router.delete('/:productId', protect, requireAdmin, async (request, response) => {
  try {
    const product = await Product.findByIdAndDelete(request.params.productId);

    if (!product) {
      return response.status(404).json({ message: 'Product not found.' });
    }

    return response.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Deleting product failed:', error);
    return response.status(500).json({ message: 'Unable to delete product right now.' });
  }
});

router.patch('/:productId', protect, requireAdmin, async (request, response) => {
  try {
    const { name, category, price, rating, stock, image, description } = request.body;

    const product = await Product.findById(request.params.productId);

    if (!product) {
      return response.status(404).json({ message: 'Product not found.' });
    }

    if (name) product.name = name.trim();
    if (category) product.category = category.trim();
    if (price !== undefined) product.price = Number(price);
    if (rating !== undefined) product.rating = Number(rating);
    if (stock !== undefined) product.stock = Number(stock);
    if (image) product.image = image.trim();
    if (description) product.description = description.trim();

    await product.save();

    return response.json({
      message: 'Product updated successfully.',
      product: formatProduct(product),
    });
  } catch (error) {
    console.error('Updating product failed:', error);
    return response.status(500).json({ message: 'Unable to update product right now.' });
  }
});

export default router;
