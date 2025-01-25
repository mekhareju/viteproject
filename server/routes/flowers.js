const express = require('express');
const authenticateToken = require('../middleware/Middleware.js');
const Flower = require('../models/Flowers'); 
const router = express.Router();
const defineAbilitiesFor = require('../casl/defineAbilities');

router.get('/', async (req, res) => {
  try {
    const flowers = await Flower.find(); 

    if (flowers.length === 0) {
        return res.status(200).json({ message: 'No flowers available.' });
      }
    res.status(200).json(flowers); 
  } catch (error) {
    console.error('Error fetching flowers:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  const ability = defineAbilitiesFor(req.user); 

  if (!ability.can('create', 'Flower')) {
    return res.status(403).json({ message: 'Insufficient permissions: Cannot create flower' });
  }

  try {
    const { name, color, price } = req.body;
    if (!name || !color || !price) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newFlower = new Flower({ name, color, price });
    await newFlower.save();

    res.status(201).json({ message: 'Flower created successfully', flower: newFlower });
  } catch (error) {
    console.error('Error creating flower:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
