const express = require('express');
const {signup,login,forgotPassword,updatePassword,protect, restrictTo} = require('../controllers/authController');
const {updateMe,deleteMe,getAllUsers,getUser,updateUser,deleteUser} = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/forgotPassword', forgotPassword);
router.patch('/updatePassword',protect,updatePassword);

router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.route('/')
      .get(protect,restrictTo('admin', 'moderator'),getAllUsers);

router.route('/:id')
      .get(protect,getUser)
      .delete(protect,restrictTo('admin'),deleteUser);
      
module.exports = router;