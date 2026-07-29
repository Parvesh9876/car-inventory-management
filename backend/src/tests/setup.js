/**
 * Test Database Setup
 */

jest.setTimeout(30000);

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
 * Clean all collections after each test.
 */
afterEach(async () => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  const collections = mongoose.connection.collections;

  for (const collection of Object.values(collections)) {
    await collection.deleteMany({});
  }
});

/**
 * Close database connection.
 */
afterAll(async () => {
  await mongoose.connection.close();
});