const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');
const Cart = require('./cart');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            // cb is a callback function that has one argument "products"
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }

    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                // write new data to .json file
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();

                // push product name to products array
                products.push(this);

                // write new data to .json file
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });

    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id);
            cb(product);
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id);

            const updatedProducts = products.filter(product => product.id !== id);

            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        })
    }



}