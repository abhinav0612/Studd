const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
     try {
       console.log("Connected. Finding users...");
       const users = await User.find({});
       console.log("Users in DB:", users.map(u => u.email));

       console.log("Attempting to insert a user...");
       const testUser = new User({ name: "Test User", email: "test" + Date.now() + "@example.com", password: "123" });
       await testUser.save();
       console.log("Insert successful! User email:", testUser.email);
     } catch (e) {
       console.error("Error during DB operations:", e);
     }
     process.exit(0);
  })
  .catch(e => {
     console.error("Connection error:", e);
     process.exit(1);
  });
