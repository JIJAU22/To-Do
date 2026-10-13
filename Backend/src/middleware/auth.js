const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressRequireAuth({
  onError: (error) => {
    console.error('Auth error:', error);
  }
});

const extractUserId = (req, res, next) => {
  try {
    if (req.auth && req.auth.userId) {
      req.userId = req.auth.userId;
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized - No user ID found' });
    }
  } catch (error) {
    console.error('Error extracting user ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { requireAuth, extractUserId };
