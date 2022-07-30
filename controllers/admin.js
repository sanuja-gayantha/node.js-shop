const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('./admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: false })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.render('/');
    }
    const productId = req.params.productId;
    Product.findById(productId, product => {
        if (!product) {
            return res.render('/');
        }
        res.render('./admin/edit-product', { pageTitle: 'Edit Product', path: '/admin/add-product', editing: editMode, product: product });
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, price, description);
    product.save();

    res.redirect('/');
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(productId, title, imageUrl, price, description);
    product.save();


    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);

    res.redirect('/admin/products');

}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('./admin/products', { pageTitle: 'Admin Products', products: products, path: '/admin/products' })
    });
}