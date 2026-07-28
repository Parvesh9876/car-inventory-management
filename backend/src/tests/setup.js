/**
 * Test Database Setup
 *
 * This file runs automatically before and after Jest tests.
 * It connects to the dedicated test database,
 * cleans collections after each test,
 * and closes the connection after all tests.
 */

require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

/**
 * Connect to the test database before running any tests.
 */
beforeAll(async () => {
  await connectDB(process.env.MONGODB_TEST_URI);
});

/**
 * Clean all collections after each test
 * so every test starts with a fresh database.
 */
afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const collectionName in collections) {
    await collections[collectionName].deleteMany({});
  }
});

/**
 * Close the database connection after all tests finish.
 */
afterAll(async () => {
  await mongoose.connection.close();
});