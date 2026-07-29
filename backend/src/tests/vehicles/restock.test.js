const request = require("supertest");

const app = require("../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");
const generateToken = require("../../utils/generateToken");

describe("POST /api/vehicles/:id/restock", () => {
  let adminToken;

  beforeEach(async () => {
    const admin = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: "hashed-password",
      role: "admin",
    });

    adminToken = generateToken(admin);
  });

  it("should increase vehicle quantity", async () => {
    const vehicle = await Vehicle.create({
      make: "BMW",
      model: "X5",
      category: "SUV",
      price: 75000,
      quantity: 2,
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        quantity: 5,
      });

    expect(response.statusCode).toBe(200);

    const updatedVehicle = await Vehicle.findById(vehicle._id);

    expect(updatedVehicle.quantity).toBe(7);
  });
  it("should reject restock request from normal user", async () => {
  const normalUser = await User.create({
    name: "Normal User",
    email: "normal@test.com",
    password: "hashed-password",
    role: "user",
  });

  const userToken = generateToken(normalUser);

  const vehicle = await Vehicle.create({
    make: "Honda",
    model: "City",
    category: "Sedan",
    price: 22000,
    quantity: 3,
  });

  const response = await request(app)
    .post(`/api/vehicles/${vehicle._id}/restock`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({
      quantity: 5,
    });

  expect(response.statusCode).toBe(403);
});
});