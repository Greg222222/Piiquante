const multer = require('../middleware/multer-config');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const sauceCtrl = require ('../controllers/sauce')

router.get('/', auth, sauceCtrl.getAllSauces )
router.get('/:id', auth, sauceCtrl.getOneSauce )
router.post('/', auth, multer, sauceCtrl.createSauce)
router.put('/:id', auth, multer, sauceCtrl.updateOne )
router.delete('/:id', auth, multer, sauceCtrl.deleteOne ) // Les 3 à finir
// router.post('/api/sauces/:id/like', auth )

module.exports = router;