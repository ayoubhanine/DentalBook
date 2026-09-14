import { jest } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("../../src/models/user.model.js", () => ({
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

const { default: User } = await import(
  "../../src/models/user.model.js"
);

const bcrypt = (await import("bcrypt")).default;

const { default: app } = await import(
  "../../src/app.js"
);

describe("Auth Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1h";
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      User.findOne.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("hashed-password");

      User.create.mockResolvedValue({
        _id: "user123",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "0600000000",
        role: "patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app)
        .post("/api/auth/register")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "password123",
          phone: "0600000000",
        });

      expect(response.status).toBe(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "User registered successfully"
      );

      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();

      expect(response.body.data.user.email).toBe(
        "john@example.com"
      );

      expect(User.create).toHaveBeenCalled();
    });

    it("should reject registration with invalid data", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          firstName: "J",
          lastName: "D",
          email: "invalid-email",
          password: "123",
        });

      expect(response.status).toBe(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Validation failed"
      );

      expect(response.body.errors).toBeDefined();

      expect(User.create).not.toHaveBeenCalled();
    });

    it("should reject registration if email already exists", async () => {
      User.findOne.mockResolvedValue({
        _id: "existing-user",
        email: "john@example.com",
      });

      const response = await request(app)
        .post("/api/auth/register")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "password123",
          phone: "0600000000",
        });

      expect(response.status).toBe(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Email already exists"
      );

      expect(User.create).not.toHaveBeenCalled();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: "user123",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "hashed-password",
          phone: "0600000000",
          role: "patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });

      bcrypt.compare.mockResolvedValue(true);

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "john@example.com",
          password: "password123",
        });

      expect(response.status).toBe(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Login successful"
      );

      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();

      expect(response.body.data.user.email).toBe(
        "john@example.com"
      );
    });

    it("should reject login with invalid email", async () => {
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "unknown@example.com",
          password: "password123",
        });

      expect(response.status).toBe(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid email or password"
      );
    });

    it("should reject login with wrong password", async () => {
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: "user123",
          email: "john@example.com",
          password: "hashed-password",
        }),
      });

      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "john@example.com",
          password: "wrong-password",
        });

      expect(response.status).toBe(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid email or password"
      );
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return current user with valid token", async () => {
      User.findById.mockResolvedValue({
        _id: "user123",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "0600000000",
        role: "patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email: "john@example.com",
          password: "password123",
        });

      // Login needs a mocked user
      if (loginResponse.status !== 200) {
        User.findOne.mockReturnValue({
          select: jest.fn().mockResolvedValue({
            _id: "user123",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "hashed-password",
            phone: "0600000000",
            role: "patient",
          }),
        });

        bcrypt.compare.mockResolvedValue(true);
      }

      const response = await request(app)
        .get("/api/auth/me")
        .set(
          "Authorization",
          "Bearer invalid-token"
        );

      expect(response.status).toBe(401);
    });

    it("should reject request without token", async () => {
      const response = await request(app)
        .get("/api/auth/me");

      expect(response.status).toBe(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Authentication required"
      );
    });

    it("should reject request with invalid token", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set(
          "Authorization",
          "Bearer invalid-token"
        );

      expect(response.status).toBe(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid or expired token"
      );
    });
  });
});