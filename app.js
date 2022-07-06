const path = require('path');

const express = require('express');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const rootDir = require('./util/path');
const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);