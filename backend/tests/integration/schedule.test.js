import request from "supertest";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";

const mockSchedule = {
  _id: "schedule123",
  day: "Monday",
  startTime: "09:00",
  endTime: "18:00",
  isAvailable: true,
};

const mockAdmin = {
  id: "admin123",
  role: "admin",
};

const mockPatient = {
  id: "patient123",
  role: "patient",
};

const mockSchedules = [mockSchedule];

const mockScheduleModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

jest.unstable_mockModule(
  "../../src/models/schedule.model.js",
  () => ({
    default: mockScheduleModel,
  })
);

const { default: app } = await import("../../src/app.js");

process.env.JWT_SECRET = "test-secret";

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const adminToken = generateToken(mockAdmin);
const patientToken = generateToken(mockPatient);

describe("Schedule Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/schedules", () => {
    test("should return all schedules", async () => {
      mockScheduleModel.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockSchedules),
      });

      const response = await request(app)
        .get("/api/schedules");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.schedules).toEqual(
        mockSchedules
      );
    });
  });

  describe("GET /api/schedules/:id", () => {
    test("should return schedule by id", async () => {
      mockScheduleModel.findById.mockResolvedValue(
        mockSchedule
      );

      const response = await request(app)
        .get("/api/schedules/schedule123");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.schedule).toEqual(
        mockSchedule
      );
    });

    test("should return 404 if schedule does not exist", async () => {
      mockScheduleModel.findById.mockResolvedValue(null);

      const response = await request(app)
        .get("/api/schedules/not-found");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/schedules", () => {
    test("should create schedule as admin", async () => {
      mockScheduleModel.findOne.mockResolvedValue(null);
      mockScheduleModel.create.mockResolvedValue(
        mockSchedule
      );

      const response = await request(app)
        .post("/api/schedules")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          day: "Monday",
          startTime: "09:00",
          endTime: "18:00",
          isAvailable: true,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.schedule).toEqual(
        mockSchedule
      );
       expect(mockScheduleModel.findOne).toHaveBeenCalledWith({
    day: "Monday",
              });

      expect(
        mockScheduleModel.create
      ).toHaveBeenCalled();
    });

    test("should reject non-admin user", async () => {
      const response = await request(app)
        .post("/api/schedules")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          day: "Monday",
          startTime: "09:00",
          endTime: "18:00",
        });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    test("should reject request without token", async () => {
      const response = await request(app)
        .post("/api/schedules")
        .send({
          day: "Monday",
          startTime: "09:00",
          endTime: "18:00",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    test("should reject invalid day", async () => {
      const response = await request(app)
        .post("/api/schedules")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          day: "Funday",
          startTime: "09:00",
          endTime: "18:00",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Validation failed"
      );
    });

    test("should reject invalid time format", async () => {
      const response = await request(app)
        .post("/api/schedules")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          day: "Monday",
          startTime: "9:00",
          endTime: "18:00",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test("should reject end time before start time", async () => {
      const response = await request(app)
        .post("/api/schedules")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          day: "Monday",
          startTime: "18:00",
          endTime: "09:00",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);

      expect(response.body.errors).toContain(
        "End time must be after start time"
      );
    });
  });

  describe("PATCH /api/schedules/:id", () => {
    test("should update schedule as admin", async () => {
      mockScheduleModel.findById.mockResolvedValue(
        mockSchedule
      );

      const updatedSchedule = {
        ...mockSchedule,
        startTime: "10:00",
      };

      mockScheduleModel.findByIdAndUpdate.mockResolvedValue(
        updatedSchedule
      );

      const response = await request(app)
        .patch("/api/schedules/schedule123")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          startTime: "10:00",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.schedule).toEqual(
        updatedSchedule
      );
    });

    test("should reject non-admin user", async () => {
      const response = await request(app)
        .patch("/api/schedules/schedule123")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          startTime: "10:00",
        });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    test("should reject empty update body", async () => {
      const response = await request(app)
        .patch("/api/schedules/schedule123")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test("should reject invalid time format", async () => {
      const response = await request(app)
        .patch("/api/schedules/schedule123")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          startTime: "25:00",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/schedules/:id", () => {
    test("should delete schedule as admin", async () => {
      mockScheduleModel.findById.mockResolvedValue(
        mockSchedule
      );

      mockScheduleModel.findByIdAndDelete.mockResolvedValue(
        mockSchedule
      );

      const response = await request(app)
        .delete("/api/schedules/schedule123")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      expect(
        mockScheduleModel.findByIdAndDelete
      ).toHaveBeenCalledWith("schedule123");
    });

    test("should reject non-admin user", async () => {
      const response = await request(app)
        .delete("/api/schedules/schedule123")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        );

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    test("should return 404 if schedule does not exist", async () => {
      mockScheduleModel.findById.mockResolvedValue(null);

      const response = await request(app)
        .delete("/api/schedules/not-found")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});