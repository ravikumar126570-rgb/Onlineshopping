import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

function formatAuthResponse(user) {
  return {
    token: createToken(user),
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  };
}

function createToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      isAdmin: Boolean(user.isAdmin),
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
}

router.post('/signup', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return response
        .status(400)
        .json({ message: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return response.status(409).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUsersCount = await User.countDocuments();
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      isAdmin: existingUsersCount === 0,
    });

    return response.status(201).json(formatAuthResponse(user));
  } catch (error) {
    console.error('Signup failed:', error);
    return response.status(500).json({ message: 'Unable to create account right now.' });
  }
});

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return response.status(401).json({ message: 'Invalid email or password.' });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return response.status(401).json({ message: 'Invalid email or password.' });
    }

    return response.json(formatAuthResponse(user));
  } catch (error) {
    console.error('Login failed:', error);
    return response.status(500).json({ message: 'Unable to login right now.' });
  }
});

router.get('/me', protect, async (request, response) => {
  try {
    const user = await User.findById(request.user.userId).select('-password');

    if (!user) {
      return response.status(404).json({ message: 'User not found.' });
    }

    return response.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Fetching profile failed:', error);
    return response.status(500).json({ message: 'Unable to load profile right now.' });
  }
});

export default router;
