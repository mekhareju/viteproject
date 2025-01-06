"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User_1.default.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No updates provided' });
        }
        if (updates.password) {
            return res.status(400).json({ message: 'Password updates are not allowed here' });
        }
        const user = await User_1.default.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Profile updated successfully', user });
    }
    catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
