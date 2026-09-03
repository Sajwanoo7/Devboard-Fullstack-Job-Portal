const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');





router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received registration data:', { name, email }); // Debug log
    try {  

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });

     }catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});   




router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
          const user = await User.findOne({ email });
          if (!user) {
              return res.status(400).json({ message: 'Invalid credentials' });
          }
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
              return res.status(400).json({ message: 'Invalid credentials' });
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
      } catch (err) {
          res.status(500).json({ message: 'Server error' });
      }
});



module.exports = router;