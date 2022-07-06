const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');

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
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            // push product name to products array
            products.push(this);

            // write new data to .json file
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });

    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

}