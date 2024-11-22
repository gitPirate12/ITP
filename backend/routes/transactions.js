const { addLiability, getLiabilities, updateLiability, deleteLiability } = require('../controllers/liability');
const { addAssets, getAssets, deleteAssets, updateAsset } = require('../controllers/assets');

const router = require('express').Router();


router.post('/add-assets', addAssets)
    .get('/get-assets', getAssets)
    .put('/update-asset/:id', updateAsset)
    .delete('/delete-assets/:id', deleteAssets)
    .post('/add-liability', addLiability)
    .get('/get-liabilities', getLiabilities)
    .put('/update-liability/:id', updateLiability)
    .delete('/delete-liability/:id', deleteLiability)

module.exports = router;