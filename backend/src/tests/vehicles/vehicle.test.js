const request = require("supertest");

const app = require("../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");
const generateToken = require("../../utils/generateToken");

describe("Vehicle API", () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    // Create an admin user.
    const admin = await User.create({
      name: "Admin User",
      email: "vehicle-admin@test.com",
      password: "hashed-password",
      role: "admin",
    });

    // Create a normal user.
    const user = await User.create({
      name: "Normal User",
      email: "vehicle-user@test.com",
      password: "hashed-password",
      role: "user",
    });

    adminToken = generateToken(admin);
    userToken = generateToken(user);
  });

  /**
   * CREATE VEHICLE
   */
  describe("POST /api/vehicles", () => {
    it("should allow admin to create a vehicle", async () => {
      const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          make: "Toyota",
          model: "Fortuner",
          category: "SUV",
          price: 45000,
          quantity: 5,
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.make).toBe("Toyota");

      const vehicle = await Vehicle.findOne({
        model: "Fortuner",
      });

      expect(vehicle).not.toBeNull();
    });

    it("should reject vehicle creation from normal user", async () => {
      const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          make: "Toyota",
          model: "Fortuner",
          category: "SUV",
          price: 45000,
          quantity: 5,
        });

      expect(response.statusCode).toBe(403);
    });
  });

  /**
   * GET ALL VEHICLES
   */
  describe("GET /api/vehicles", () => {
    it("should return all vehicles", async () => {
      await Vehicle.create([
        {
          make: "Toyota",
          model: "Fortuner",
          category: "SUV",
          price: 45000,
          quantity: 5,
        },
        {
          make: "Honda",
          model: "City",
          category: "Sedan",
          price: 22000,
          quantity: 8,
        },
      ]);

      const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);
    });
  });

  /**
   * SEARCH VEHICLES
   */
  describe("GET /api/vehicles/search", () => {
    beforeEach(async () => {
      await Vehicle.create([
        {
          make: "Toyota",
          model: "Fortuner",
          category: "SUV",
          price: 45000,
          quantity: 5,
        },
        {
          make: "Toyota",
          model: "Camry",
          category: "Sedan",
          price: 38000,
          quantity: 3,
        },
        {
          make: "BMW",
          model: "X5",
          category: "SUV",
          price: 75000,
          quantity: 2,
        },
      ]);
    });

    it("should search vehicles by make", async () => {
      const response = await request(app)
        .get("/api/vehicles/search?make=Toyota")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.count).toBe(2);
    });

    it("should search vehicles by category", async () => {
      const response = await request(app)
        .get("/api/vehicles/search?category=SUV")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.count).toBe(2);
    });

    it("should search vehicles by price range", async () => {
      const response = await request(app)
        .get(
          "/api/vehicles/search?minPrice=30000&maxPrice=50000"
        )
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.count).toBe(2);
    });
  });

  /**
   * UPDATE VEHICLE
   */
  describe("PUT /api/vehicles/:id", () => {
    it("should allow admin to update a vehicle", async () => {
      const vehicle = await Vehicle.create({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 45000,
        quantity: 5,
      });

      const response = await request(app)
        .put(`/api/vehicles/${vehicle._id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          price: 48000,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.data.price).toBe(48000);
    });

    it("should reject update from normal user", async () => {
      const vehicle = await Vehicle.create({
        make: "Honda",
        model: "City",
        category: "Sedan",
        price: 22000,
        quantity: 5,
      });

      const response = await request(app)
        .put(`/api/vehicles/${vehicle._id}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          price: 25000,
        });

      expect(response.statusCode).toBe(403);
    });
  });

  /**
   * DELETE VEHICLE
   */
  describe("DELETE /api/vehicles/:id", () => {
    it("should allow admin to delete a vehicle", async () => {
      const vehicle = await Vehicle.create({
        make: "BMW",
        model: "X5",
        category: "SUV",
        price: 75000,
        quantity: 2,
      });

      const response = await request(app)
        .delete(`/api/vehicles/${vehicle._id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);

      const deletedVehicle = await Vehicle.findById(
        vehicle._id
      );

      expect(deletedVehicle).toBeNull();
    });

    it("should reject delete from normal user", async () => {
      const vehicle = await Vehicle.create({
        make: "BMW",
        model: "X5",
        category: "SUV",
        price: 75000,
        quantity: 2,
      });

      const response = await request(app)
        .delete(`/api/vehicles/${vehicle._id}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.statusCode).toBe(403);
    });
  });
});