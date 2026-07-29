const request = require("supertest");

const app = require("../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");
const generateToken = require("../../utils/generateToken");

describe("POST /api/vehicles/:id/purchase", () => {
  let user;
  let token;

  /**
   * Create an authenticated user before every test.
   */
  beforeEach(async () => {
    user = await User.create({
      name: "Test User",
      email: "purchase@test.com",
      password: "hashed-password",
      role: "user",
    });

    token = generateToken(user);
  });

  it("should purchase a vehicle and decrease quantity by one", async () => {
    const vehicle = await Vehicle.create({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 45000,
      quantity: 5,
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    const updatedVehicle = await Vehicle.findById(vehicle._id);

    expect(updatedVehicle.quantity).toBe(4);
  });

  it("should not allow purchase when vehicle is out of stock", async () => {
    const vehicle = await Vehicle.create({
      make: "Honda",
      model: "City",
      category: "Sedan",
      price: 22000,
      quantity: 0,
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Vehicle is out of stock");
  });
  it("should return 404 when vehicle does not exist", async () => {
  const fakeId = "507f1f77bcf86cd799439011";

  const response = await request(app)
    .post(`/api/vehicles/${fakeId}/purchase`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(404);

  expect(response.body.message).toBe("Vehicle not found");
});
});