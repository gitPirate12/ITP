const { addsupplier, getsuppliers, updateSupplier,deletesupplier } = require('../controllers/scm_supplier');
const { addsupplyOrder, getsupplyOrders, updatesupplyorder,deletesupplyorder } = require('../controllers/scm_supplyorder');

const router = require('express').Router();



router.post('/addsupplier', addsupplier)
    .get('/getsuppliers', getsuppliers)
    .patch('/updatesupplier/:id', updateSupplier)
    .delete('/deletesupplier/:id', deletesupplier)
    .post('/addsupplyorder', addsupplyOrder)
    .get('/getsupplyorders', getsupplyOrders)
    .patch('/updatesupplyorder/:id', updatesupplyorder)
    .delete('/deletesupplyorder/:id', deletesupplyorder)

module.exports = router