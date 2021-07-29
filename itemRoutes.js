const express = require('express');
const router = new express.Router();
const itemsList = require('./fakeDb');
const MyError = require('./myError');

router.get('', (req, res, next) => {
    try{
        return res.json({items: itemsList})
    }catch(e){
        return next(e);
    }
})

router.post('', (req, res, next) => {
    try{
        let newItem = {name: req.body.name, price: req.body.price};
        itemsList.push(newItem);
        return res.json({item: newItem});
    }catch(e){
        return next(e)
    }
});

router.get('/:name', (req, res, next) => {
    try{
        let item = itemsList.find(i => i.name === req.params.name);
        return res.json({item: item});
    }catch(e){
        return next(e)
    }
});

router.patch('/:name', (req, res, next) => {
    try{
        let item = itemsList.find(i => i.name === req.params.name);
        if(item === undefined){
            let e = new MyError('Item not found', 404);
            return next(e);
        }

        item.name = req.body.name;
        item.price = req.body.price;
        return res.json({updated_item: item});
    }catch(e){
        return next(e);
    }
});

router.delete('/:name', (req, res, next) => {
    try{
        let itemIndex = itemsList.findIndex(i => i.name === req.params.name);
        let item = itemsList.find(i => i.name === req.params.name);
        if(itemIndex == -1){
            let e = new MyError('Item not found', 404);
            return next(e);
        }

        itemsList.splice(itemIndex, 1);
        return res.json({Deleted: item});
    }catch(e){
        return next(e);
    }
});

module.exports = router;