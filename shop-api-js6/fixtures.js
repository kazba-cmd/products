const mongoose = require('mongoose');
const config = require('./app/config');
const Category = require('./app/models/Category');
const Products = require('./app/models/Products');
const User = require('./app/models/User');
const {nanoid} = require('nanoid');

mongoose.connect(config.db.url + '/' + config.db.name,{ useNewUrlParser: true, useUnifiedTopology: true } );

const db = mongoose.connection;

db.once('open', async () => {
   try {
       await db.dropCollection('categories');
       await db.dropCollection('products');
       await db.dropCollection('users');
   } catch (e) {
       console.log('Collection not found. Drop collections skiped...');
   }

   const [computers, cars, food, plants] = await Category.create({
       title: "Computers",
       description: "Personal computers and notebooks"
   }, {
       title: "Cars",
       description: "Machines with engines"
   }, {
       title: "Food",
       description: "Something to eat"
   }, {
       title: "Plants",
       description: "All to your garden"
   }
   );
      const [admin, user, user2] = await User.create({
       username: "admin",
       email: "admin@admin.com",
       password: "123456",
       displayName: "Admin",
       phoneNumber: 87015350909,
       token: nanoid()
   }, {
       username: "user",
       email: "user@user.com",
       password: "123456",
       displayName: "User",
       phoneNumber: 87011111111,
       token: nanoid()
   }, {
        username: "user2",
        email: "user2@user.com",
        password: "123456",
        displayName: "User2",
        phoneNumber: 87012222222,
        token: nanoid()
    });

   await Products.create({
       title: "Asus Zenbook",
       description: "Intel core i7",
       price: 600,
       category: computers._id,
       boss: admin._id,
       image: "asus.jpeg"
   }, {
       title: "Mac Air",
       description: "Mac processor",
       price: 1000,
       category: computers._id,
       boss: user._id,
       image: "mac.jpeg"
   }, {
       title: "Aston Martin",
       description: '500 horse power',
       price: 50000,
       category: cars._id,
       boss: admin._id,
       image: "aston.jpeg"
   }, {
       title: "Burger",
       description: 'with tomato',
       price: 20,
       category: food._id,
       boss: user2._id,
       image: "burger.jpeg"
   }, {
       title: "Cactus",
       description: 'quiet plant',
       price: 40,
       category: plants._id,
       boss: user._id,
       image: "cactus.jpeg"
   });



   await db.close();
});