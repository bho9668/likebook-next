import express from 'express'
const router = express.Router()

// Route for POST authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  return res.status(200).json({ success: true, data });
});

// Route for POST Registration
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  return res.status(200).json({ success: true, data: null });
});

export default router;