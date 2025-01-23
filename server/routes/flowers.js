const express = require('express');
const authenticateToken = require('../middleware/Middleware.js');
const checkAbilities = require('../middleware/checkAbilities');
const Flower = require('../models/Flowers'); 
const router = express.Router();

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

router.post('/', authenticateToken, checkAbilities('create', 'Flower'), async (req, res) => {
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
