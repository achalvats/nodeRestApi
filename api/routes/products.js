const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/product');
const { request } = require('express');

router.get('/', (req, res, next) => {
    Product.find()
    .select('id name price')
    .exec()
    .then(doc => {
        const response ={
            count: doc.length,
            products: doc.map( data => {
                return{
                    name: data.name,
                    price: data.price,
                    id: data._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+data._id
                    }
                }
            })
        };
        console.log(doc);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'this is a post request from /products',
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error : err})
    });
    
});

router.patch('/:productID', (req, res, next) => {
    var productID = req.params.productID;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.PropName]= ops.value;
    }
    
    Product.update({_id: productID}, { $set: updateOps})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.delete('/:productID', (req, res, next) => {
    var productID = req.params.productID;
    Product.remove({_id: productID})
    .exec()
    .then(doc => {
        if(Object.keys(doc).length > 0) {
            console.log(doc);
            res.status(200).json({message: "object deleted", id: productID, result: doc})
        }else{
            res.status(404).json({message: "Id not found", result: doc});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });
});

router.get('/:productID', (req, res, next) => {
    var productID = req.params.productID;
    Product.findById(productID)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json({doc})
            }else
            {
                res.status(404).json({message: 'No valid response found '})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
    if( productID === '007'){
        res.status(200).json({
            message: 'welcome to special back door',
            Id: productID
        });
    }
})



module.exports = router;