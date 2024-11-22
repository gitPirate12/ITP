const { addCampaign, getCampaign, updateCampaign,deleteCampaig } = require('../controllers/mr_campaign');
// const { addloyality, getloyality, updateloyality,deleteloyality } = require('../controllers/mr_loyalitycustomer');

const router = require('express').Router();



router.post('/addCampaign', addCampaign)
    .get('/getCampaign', getCampaign)
    .put('/updateCampaign', updateCampaign)
    .delete('/deleteCampaign/:id', deleteCampaig)
    //  .post('/addloyality', addloyality)
    //  .get('/getloyality', getloyality)
    //  .patch('/updateloyality/:id', updateloyality)
    //  .delete('/deleteloyality/:id', deleteloyality)

module.exports = router
