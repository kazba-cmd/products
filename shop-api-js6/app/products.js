const express = require('express');
const multer = require('multer');
const router = express.Router();
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('./config');
const Product = require('./models/Products');
const auth = require('./middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
const createRouter = () =>{
    router.get('/', async (req, res) => {
        try {
            const products = await Product.find().populate('category').populate('boss');
            res.send(products);
        } catch (e) {
            res.status(499).send(e);
        }

    });

    router.get('/categories/:id', async (req, res) => {
        try {
            const products = await Product.find({category: req.params.id});
            res.send(products);
        } catch (e) {
            res.status(500).send(e);
        }

    });

    router.get('/:id', async (req, res) => {
        try{
            const product = await Product.findById(req.params.id).populate('category').populate('boss');
            res.send(product);
        }catch (e) {
            res.sendStatus(404);
        }
    });

    router.post('/', auth, upload.single('image'), async (req, res) => {

        const product = new Product(req.body);

        if(req.file){
            product.image = req.file.filename;
        }

        product.boss = req.user._id;

        try{
            await product.save();
            res.send(product);
        } catch (e) {
            res.status(498).send(e);
        }
    });


    return router;
};


module.exports = createRouter;