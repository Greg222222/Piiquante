const multer = require('../middleware/multer-config');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const sauceCtrl = require ('../controllers/sauce')

// router.get('/api/sauces', auth )
// router.get('/api/sauces/:id', auth )
router.post('/', auth, multer, sauceCtrl.createSauce)
// router.put('/api/sauces/:id', auth )
// router.delete('/api/sauces/:id', auth )
// router.post('/api/sauces/:id/like', auth )

module.exports = router;