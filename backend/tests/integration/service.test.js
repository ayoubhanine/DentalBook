import request from "supertest";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";

const mockService = {
  _id: "service123",
  name: "Dental Cleaning",
  description: "Professional dental cleaning",
  duration: 60,
  price: 300,
  isActive: true,
};

const mockAdmin = {
  id: "admin123",
  role: "admin",
};

const mockPatient = {
  id: "patient123",
  role: "patient",
};

const mockServices = [mockService];

const mockServiceModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

jest.unstable_mockModule("../../src/models/service.model.js", () => ({
  default: mockServiceModel,
}));

const { default: app } = await import("../../src/app.js");

process.env.JWT_SECRET = "test-secret";

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const adminToken = generateToken(mockAdmin);
const patientToken = generateToken(mockPatient);

describe("Service Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/services", () => {
    test("should return all services for authenticated user", async () => {
      mockServiceModel.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockServices),
      });

      const response = await request(app)
        .get("/api/services")
        .set("Authorization", `Bearer ${patientToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.services).toEqual(mockServices);
    });

    test("should reject request without token", async () => {
      const response = await request(app)
        .get("/api/services");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/services/:id", () => {
    test("should return service by id", async () => {
      mockServiceModel.findById.mockResolvedValue(mockService);

      const response = await request(app)
        .get("/api/services/service123");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.service).toEqual(mockService);
    });

    test("should return 404 if service does not exist", async () => {
      mockServiceModel.findById.mockResolvedValue(null);

      const response = await request(app)
        .get("/api/services/not-found");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/services", () => {
    test("should create service as admin", async () => {
      mockServiceModel.findOne.mockResolvedValue(null);
      mockServiceModel.create.mockResolvedValue(mockService);

      const response = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Dental Cleaning",
          description: "Professional dental cleaning",
          duration: 60,
          price: 300,
          isActive: true,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.service).toEqual(mockService);

      expect(mockServiceModel.create).toHaveBeenCalled();
    });

    test("should reject non-admin user", async () => {
      const response = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${patientToken}`)
        .send({
          name: "Dental Cleaning",
          description: "Professional dental cleaning",
          duration: 60,
          price: 300,
        });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    test("should reject invalid service data", async () => {
      const response = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "A",
          duration: 0,
          price: -10,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed");
    });

    test("should reject duplicate service name", async () => {
      mockServiceModel.findOne.mockResolvedValue(mockService);

      const response = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Dental Cleaning",
          description: "Professional dental cleaning",
          duration: 60,
          price: 300,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "A service with this name already exists"
      );
    });
  });

  describe("PATCH /api/services/:id", () => {
    test("should update service as admin", async () => {
      mockServiceModel.findById.mockResolvedValue(mockService);

      mockServiceModel.findOne.mockResolvedValue(null);

      const updatedService = {
        ...mockService,
        price: 350,
      };

      mockServiceModel.findByIdAndUpdate.mockResolvedValue(
        updatedService
      );

      const response = await request(app)
        .patch("/api/services/service123")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          price: 350,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.service).toEqual(updatedService);
    });

    test("should reject non-admin user", async () => {
      const response = await request(app)
        .patch("/api/services/service123")
        .set("Authorization", `Bearer ${patientToken}`)
        .send({
          price: 350,
        });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    test("should reject empty update body", async () => {
      const response = await request(app)
        .patch("/api/services/service123")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

   test("should return 400 if service does not exist", async () => {
  mockServiceModel.findById.mockResolvedValue(null);

  const response = await request(app)
    .patch("/api/services/not-found")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      price: 350,
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Service not found");
});
  });

  describe("DELETE /api/services/:id", () => {
    test("should delete service as admin", async () => {
  mockServiceModel.findById.mockResolvedValue(mockService);
  mockServiceModel.findByIdAndDelete.mockResolvedValue(
    mockService
  );

  const response = await request(app)
    .delete("/api/services/service123")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe(
    "Service deleted successfully"
  );

  expect(
    mockServiceModel.findByIdAndDelete
  ).toHaveBeenCalledWith("service123");
});

    test("should reject non-admin user", async () => {
      const response = await request(app)
        .delete("/api/services/service123")
        .set("Authorization", `Bearer ${patientToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    test("should return 404 if service does not exist", async () => {
      mockServiceModel.findById.mockResolvedValue(null);

      const response = await request(app)
        .delete("/api/services/not-found")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});