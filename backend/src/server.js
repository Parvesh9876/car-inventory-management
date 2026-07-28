/**
 * server.js
 *
 * Entry point of the application.
 * Responsible for:
 * 1. Loading environment variables
 * 2. Connecting MongoDB
 * 3. Starting Express Server
 */

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {

    await connectDB(process.env.MONGODB_URI);

    app.listen(PORT, () => {

        console.log(`🚀 Server running on port ${PORT}`);

    });

};

startServer();