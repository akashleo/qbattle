import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/authorize.middleware.js';

const router = Router();

// GET /api/users — List all users (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, username, email, role, avatar_url, is_online, last_seen, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('List users error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.error('List users error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
