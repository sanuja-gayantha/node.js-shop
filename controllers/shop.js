const { render } = require('express/lib/response');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

    // pass function in to fetchAll function
    Product.fetchAll((products) => {
        res.render('./shop/product-list', { pageTitle: 'All Products', products: products, path: '/products' })
    });

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('./shop/product-detail', { pageTitle: 'Product Detail', product: product, path: '/products' });
    });

}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('./shop/index', { pageTitle: 'Shop', products: products, path: '/' });
    });

}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('./shop/cart', { pageTitle: 'Cart', path: '/cart', products: cartProducts });
        });
    });
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });

}

exports.getOrders = (req, res, next) => {
    res.render('./shop/orders', { pageTitle: 'Orders', path: '/orders' });
}

exports.getCheckOut = (req, res, next) => {
    res.render('./shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
}