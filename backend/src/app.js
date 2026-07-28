/**
 * app.js
 *
 * Creates and configures the Express application.
 * This file does NOT start the HTTP server.
 * Keeping app creation separate from server startup
 * makes testing much easier with Supertest.
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

/**
 * Security Middleware
 * Adds common HTTP security headers.
 */
app.use(helmet());

/**
 * Enable Cross-Origin Resource Sharing
 * Allows React frontend to communicate with backend.
 */
app.use(cors());

/**
 * Logs every incoming request in development.
 */
app.use(morgan("dev"));

/**
 * Parses incoming JSON request bodies.
 */
app.use(express.json());

/**
 * Parses URL Encoded data.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Temporary Health Check Route
 */
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

module.exports = app;