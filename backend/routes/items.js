const { addItem, getItems,getItem,deleteItem,updateItem} = require('../controllers/itemController');


const router = require('express').Router();



router.post('/add-item', addItem)
      .get('/get-items', getItems)
      .get('/get-item/:id', getItem)
      .delete('/delete-item/:id', deleteItem)
      .patch('/update-item/:id', updateItem)
module.exports = router