// Run this once to create the default admin user
// Command: node seed.js

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const dotenv   = require('dotenv');
dotenv.config();

const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Delete existing admin
  await User.deleteOne({ username: 'admin' });

  const admin = await User.create({
    username: 'admin',
    email:    'admin@ecocharge.com',
    password: 'ecocharge2025',
    role:     'admin'
  });

  console.log('✅ Admin user created:', admin.username);
  console.log('   Username : admin');
  console.log('   Password : ecocharge2025');
  console.log('   Role     : admin');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });