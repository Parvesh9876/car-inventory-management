const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User");

describe("POST /api/auth/register", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Parvesh Kumar",
        email: "parvesh@gmail.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("User registered successfully");

    expect(response.body.data).toBeDefined();

    expect(response.body.data.name).toBe("Parvesh Kumar");

    expect(response.body.data.email).toBe("parvesh@gmail.com");

    expect(response.body.data.role).toBe("user");
  });

  it("should save the registered user in the database", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Parvesh Kumar",
      email: "parvesh@gmail.com",
      password: "password123",
    });

  const user = await User.findOne({
    email: "parvesh@gmail.com",
  });

  expect(user).not.toBeNull();
});

it("should hash the password before saving", async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Parvesh Kumar",
            email: "parvesh@gmail.com",
            password: "password123"
        });

    const user = await User.findOne({
        email: "parvesh@gmail.com"
    });

    expect(user.password).not.toBe("password123");

});

it("should return 409 if email already exists", async () => {
  const userData = {
    name: "Parvesh Kumar",
    email: "parvesh@gmail.com",
    password: "password123",
  };

  // First registration
  await request(app)
    .post("/api/auth/register")
    .send(userData);

  // Second registration with same email
  const response = await request(app)
    .post("/api/auth/register")
    .send(userData);

  expect(response.status).toBe(409);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Email already exists");
});
});