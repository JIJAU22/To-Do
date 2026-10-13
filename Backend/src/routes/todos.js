const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { requireAuth, extractUserId } = require('../middleware/auth');

router.use(requireAuth);
router.use(extractUserId);

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todos:', error);
      return res.status(500).json({ error: 'Failed to fetch todos' });
    }

    res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching todo:', error);
      return res.status(500).json({ error: 'Failed to fetch todo' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          user_id: req.userId,
          title: title.trim(),
          description: description || null,
          completed: completed || false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating todo:', error);
      return res.status(500).json({ error: 'Failed to create todo' });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updates = {
      updated_at: new Date().toISOString()
    };

    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ error: 'Title cannot be empty' });
      }
      updates.title = title.trim();
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (completed !== undefined) {
      updates.completed = completed;
    }

    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .eq('user_id', req.userId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating todo:', error);
      return res.status(500).json({ error: 'Failed to update todo' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', req.userId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error deleting todo:', error);
      return res.status(500).json({ error: 'Failed to delete todo' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully', data });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
