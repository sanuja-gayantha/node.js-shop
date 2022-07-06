const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');
}

exports.getProduct = (req, res, next) => {

    // pass function in to fetchAll function
    Product.fetchAll((products) => {
        res.render('shop', { pageTitle: 'Shop', products: products, path: '/' })
    });

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

}