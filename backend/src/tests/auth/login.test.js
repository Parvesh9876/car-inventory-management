const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../../app");
const User = require("../../models/User");

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    // Passwords stored in the database must be hashed.
    const hashedPassword = await bcrypt.hash("password123", 10);

    await User.create({
      name: "Login User",
      email: "login@test.com",
      password: hashedPassword,
      role: "user",
    });
  });

  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successful");

    expect(response.body.token).toBeDefined();

    expect(response.body.data.email).toBe(
      "login@test.com"
    );

    // Password must never be exposed.
    expect(response.body.data.password).toBeUndefined();
  });

  it("should return 401 for incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "wrongpassword",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Invalid email or password"
    );
  });

  it("should return 401 when user does not exist", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "doesnotexist@test.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Invalid email or password"
    );
  });

  it("should return 400 when email is invalid", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "invalid-email",
        password: "password123",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return 400 when password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});