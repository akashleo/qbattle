import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

function validateRegisterInput(body) {
  const { username, email, password } = body;
  const errors = [];

  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    errors.push('username is required');
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('email is required');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('password is required and must be at least 6 characters');
  }

  return errors;
}

function validateLoginInput(body) {
  const { email, password } = body;
  const errors = [];

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('email is required');
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push('password is required');
  }

  return errors;
}

router.post('/register', async (req, res) => {
  try {
    const errors = validateRegisterInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation error', errors });
    }

    const { username, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const { data: existingUser, error: lookupError } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error('Register lookup error:', lookupError);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const { error: insertError } = await supabase.from('users').insert({
      username: username.trim(),
      email: normalizedEmail,
      password_hash: passwordHash,
      role: 'user',
      is_online: false,
    });

    if (insertError) {
      console.error('Register insert error:', insertError);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const errors = validateLoginInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation error', errors });
    }

    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const { data: user, error: lookupError } = await supabase
      .from('users')
      .select('id, username, email, role, password_hash')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error('Login lookup error:', lookupError);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password_hash, ...userWithoutPassword } = user;

    return res.status(200).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, role, avatar_url, is_online, last_seen, created_at, updated_at')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error) {
      console.error('Me lookup error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Me error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
