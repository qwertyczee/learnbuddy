// src/controllers/userController.js
const admin = require('../config/firebase');

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    await admin.firestore().collection('users').doc(userId).update(updates);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUser, updateUser };
