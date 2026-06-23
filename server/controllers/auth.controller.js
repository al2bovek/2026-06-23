import { UserModel } from '../models/user.model.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signToken } from '../utils/token.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const AuthController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const existing = await UserModel.findByEmail(email);
      if (existing) return res.status(409).json({ message: 'Email already in use' });

      const passwordHash = await hashPassword(password);
      const user = await UserModel.create({ email, passwordHash });

      const token = signToken({ id: user.id, email: user.email });
      res.cookie('token', token, cookieOptions);
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const ok = await verifyPassword(user.password_hash, password);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

      const token = signToken({ id: user.id, email: user.email });
      res.cookie('token', token, cookieOptions);
      res.json({ user: { id: user.id, email: user.email, created_at: user.created_at } });
    } catch (err) {
      next(err);
    }
  },

  async logout(_req, res) {
    res.clearCookie('token', cookieOptions);
    res.json({ message: 'Logged out' });
  },

  async me(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ user });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { email, password } = req.body;

      const updates = {};
      if (email) updates.email = email;
      if (password) updates.passwordHash = await hashPassword(password);

      const updated = await UserModel.update(req.user.id, updates);
      if (!updated) return res.status(404).json({ message: 'User not found' });

      res.json({ user: updated });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const deleted = await UserModel.remove(req.user.id);
      if (!deleted) return res.status(404).json({ message: 'User not found' });

      res.clearCookie('token', cookieOptions);
      res.json({ message: 'Account deleted', user: deleted });
    } catch (err) {
      next(err);
    }
  },
};