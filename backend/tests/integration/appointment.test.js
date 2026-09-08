import request from "supertest";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";

process.env.JWT_SECRET = "test-secret";

const userId = "507f1f77bcf86cd799439011";
const otherUserId = "507f1f77bcf86cd799439099";
const adminId = "507f1f77bcf86cd799439088";

const serviceId = "507f1f77bcf86cd799439012";
const scheduleId = "507f1f77bcf86cd799439013";
const appointmentId = "507f1f77bcf86cd799439014";

// JWT TOKENS

const patientToken = jwt.sign(
  {
    id: userId,
    role: "patient",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);

const adminToken = jwt.sign(
  {
    id: adminId,
    role: "admin",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);

// MOCK DATA

const mockUser = {
  _id: userId,
  id: userId,
  firstName: "John",
  lastName: "Doe",
  email: "john@test.com",
  phone: "0612345678",
  role: "patient",
};

const mockAdmin = {
  _id: adminId,
  id: adminId,
  firstName: "Admin",
  lastName: "User",
  email: "admin@test.com",
  phone: "0699999999",
  role: "admin",
};

const mockService = {
  _id: serviceId,
  name: "Cleaning",
  description: "Dental cleaning",
  duration: 30,
  price: 200,
  isActive: true,
};

const mockSchedule = {
  _id: scheduleId,
  day: "Monday",
  startTime: "08:00",
  endTime: "17:00",
  isAvailable: true,
};

const mockAppointment = {
  _id: appointmentId,
  userId,
  serviceId,
  scheduleId,
  appointmentDate: new Date(
    "2026-09-14T09:00:00.000Z"
  ),
  status: "pending",
  notes: "Regular appointment",
};

const populatedAppointment = {
  ...mockAppointment,

  userId: {
    _id: userId,
    firstName: "John",
    lastName: "Doe",
    email: "john@test.com",
    phone: "0612345678",
  },

  serviceId: {
    _id: serviceId,
    name: "Cleaning",
    description: "Dental cleaning",
    duration: 30,
    price: 200,
  },

  scheduleId: {
    _id: scheduleId,
    day: "Monday",
    startTime: "08:00",
    endTime: "17:00",
    isAvailable: true,
  },
};

const otherUserAppointment = {
  ...populatedAppointment,

  userId: {
    _id: otherUserId,
    firstName: "Other",
    lastName: "Patient",
    email: "other@test.com",
    phone: "0600000000",
  },
};

const updatedAppointment = {
  ...mockAppointment,
  status: "confirmed",
};

// MOCK MODELS

const mockUserModel = {
  findById: jest.fn(),
};

const mockServiceModel = {
  findById: jest.fn(),
};

const mockScheduleModel = {
  findById: jest.fn(),
};

const mockAppointmentModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

// MOCK MODULES

jest.unstable_mockModule(
  "../../src/models/user.model.js",
  () => ({
    default: mockUserModel,
  })
);

jest.unstable_mockModule(
  "../../src/models/service.model.js",
  () => ({
    default: mockServiceModel,
  })
);

jest.unstable_mockModule(
  "../../src/models/schedule.model.js",
  () => ({
    default: mockScheduleModel,
  })
);

jest.unstable_mockModule(
  "../../src/models/appointment.model.js",
  () => ({
    default: mockAppointmentModel,
  })
);

// Import app AFTER mocks
const { default: app } = await import("../../src/app.js");

// TESTS

describe("Appointment Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUserModel.findById.mockResolvedValue(mockUser);

    mockServiceModel.findById.mockResolvedValue(
      mockService
    );

    mockScheduleModel.findById.mockResolvedValue(
      mockSchedule
    );
  });

  // POST /api/appointments

  describe("POST /api/appointments", () => {
    test("should create an appointment successfully", async () => {
      mockAppointmentModel.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });

      mockAppointmentModel.create.mockResolvedValue(
        mockAppointment
      );

      const response = await request(app)
        .post("/api/appointments")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          serviceId,
          scheduleId,
          appointmentDate:
            "2026-09-14T09:00:00.000Z",
          notes: "Regular appointment",
        });

      expect(response.statusCode).toBe(201);

      expect(response.body.success).toBe(true);

      expect(response.body.message).toBe(
        "Appointment created successfully"
      );

      expect(
        response.body.data.appointment
      ).toEqual({
        ...mockAppointment,
        appointmentDate:
          mockAppointment.appointmentDate.toISOString(),
      });

      expect(
        mockAppointmentModel.create
      ).toHaveBeenCalled();
    });

    test("should reject unauthenticated request", async () => {
      const response = await request(app)
        .post("/api/appointments")
        .send({
          serviceId,
          scheduleId,
          appointmentDate:
            "2026-09-14T09:00:00.000Z",
        });

      expect(response.statusCode).toBe(401);

      expect(response.body.success).toBe(false);
    });

    test("should reject invalid serviceId", async () => {
      const response = await request(app)
        .post("/api/appointments")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          serviceId: "invalid-id",
          scheduleId,
          appointmentDate:
            "2026-09-14T09:00:00.000Z",
        });

      expect(response.statusCode).toBe(400);

      expect(response.body.success).toBe(false);
    });

    test("should reject invalid scheduleId", async () => {
      const response = await request(app)
        .post("/api/appointments")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          serviceId,
          scheduleId: "invalid-id",
          appointmentDate:
            "2026-09-14T09:00:00.000Z",
        });

      expect(response.statusCode).toBe(400);

      expect(response.body.success).toBe(false);
    });

    test("should reject missing appointmentDate", async () => {
      const response = await request(app)
        .post("/api/appointments")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          serviceId,
          scheduleId,
        });

      expect(response.statusCode).toBe(400);

      expect(response.body.success).toBe(false);
    });

    test("should reject conflicting appointment", async () => {
      const existingAppointment = {
        ...mockAppointment,

        appointmentDate: new Date(
          "2026-09-14T09:15:00.000Z"
        ),

        serviceId: mockService,
      };

      mockAppointmentModel.find.mockReturnValue({
        populate: jest
          .fn()
          .mockResolvedValue([
            existingAppointment,
          ]),
      });

      const response = await request(app)
        .post("/api/appointments")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          serviceId,
          scheduleId,
          appointmentDate:
            "2026-09-14T09:00:00.000Z",
        });

      expect(response.statusCode).toBe(400);

      expect(response.body.success).toBe(false);

      expect(response.body.message).toBe(
        "This time slot is already booked"
      );
    });
  });
  // GET /api/appointments

  describe("GET /api/appointments", () => {
    test("admin should get all appointments", async () => {
      const query = {
        populate: jest.fn(),
        sort: jest.fn(),
      };

      query.populate.mockReturnValue(query);

      query.sort.mockResolvedValue([
        populatedAppointment,
      ]);

      mockAppointmentModel.find.mockReturnValue(query);

      const response = await request(app)
        .get("/api/appointments")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        );

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);

      expect(
        response.body.data.appointments
      ).toEqual([
        {
          ...populatedAppointment,
          appointmentDate:
            populatedAppointment.appointmentDate.toISOString(),
        },
      ]);
    });

    test("patient should not get all appointments", async () => {
      const response = await request(app)
        .get("/api/appointments")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        );

      expect(response.statusCode).toBe(403);

      expect(response.body.success).toBe(false);
    });

    test("unauthenticated user should not get all appointments", async () => {
      const response = await request(app).get(
        "/api/appointments"
      );

      expect(response.statusCode).toBe(401);

      expect(response.body.success).toBe(false);
    });
  });

  // GET /api/appointments/my

  describe("GET /api/appointments/my", () => {
    test("patient should get their appointments", async () => {
      const query = {
        populate: jest.fn(),
        sort: jest.fn(),
      };

      query.populate.mockReturnValue(query);

      query.sort.mockResolvedValue([
        populatedAppointment,
      ]);

      mockAppointmentModel.find.mockReturnValue(query);

      const response = await request(app)
        .get("/api/appointments/my")
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        );

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);

      expect(
        response.body.data.appointments
      ).toEqual([
        {
          ...populatedAppointment,
          appointmentDate:
            populatedAppointment.appointmentDate.toISOString(),
        },
      ]);
    });

    test("admin should also get their appointments", async () => {
      const query = {
        populate: jest.fn(),
        sort: jest.fn(),
      };

      query.populate.mockReturnValue(query);

      query.sort.mockResolvedValue([]);

      mockAppointmentModel.find.mockReturnValue(query);

      const response = await request(app)
        .get("/api/appointments/my")
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        );

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);
    });

    test("unauthenticated user should not get appointments", async () => {
      const response = await request(app).get(
        "/api/appointments/my"
      );

      expect(response.statusCode).toBe(401);

      expect(response.body.success).toBe(false);
    });
  });

  // GET /api/appointments/:id

  describe("GET /api/appointments/:id", () => {
    test("owner should get their appointment", async () => {
      const query = {
        populate: jest.fn(),
      };

      query.populate.mockReturnValue(query);

      query.populate.mockImplementationOnce(
        () => query
      );

      query.populate.mockImplementationOnce(
        () => query
      );

      query.populate.mockImplementationOnce(
        () => ({
          then: (resolve) =>
            resolve(populatedAppointment),
        })
      );

      mockAppointmentModel.findById.mockReturnValue(
        query
      );

      const response = await request(app)
        .get(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        );

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);

      expect(
        response.body.data.appointment
      ).toEqual({
        ...populatedAppointment,
        appointmentDate:
          populatedAppointment.appointmentDate.toISOString(),
      });
    });

   test("non-owner patient should receive 404", async () => {
  const query = {
    populate: jest.fn(),
  };

  query.populate.mockReturnValue(query);

  query.populate.mockImplementationOnce(() => query);

  query.populate.mockImplementationOnce(() => query);

  query.populate.mockImplementationOnce(() => ({
    then: (resolve) =>
      resolve(otherUserAppointment),
  }));

  mockAppointmentModel.findById.mockReturnValue(query);

  const response = await request(app)
    .get(`/api/appointments/${appointmentId}`)
    .set(
      "Authorization",
      `Bearer ${patientToken}`
    );

  expect(response.statusCode).toBe(404);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Access denied");
});

    test("admin should get any appointment", async () => {
      const query = {
        populate: jest.fn(),
      };

      query.populate.mockReturnValue(query);

      query.populate.mockImplementationOnce(
        () => query
      );

      query.populate.mockImplementationOnce(
        () => query
      );

      query.populate.mockImplementationOnce(
        () => ({
          then: (resolve) =>
            resolve(otherUserAppointment),
        })
      );

      mockAppointmentModel.findById.mockReturnValue(
        query
      );

      const response = await request(app)
        .get(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        );

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);
    });

    test("should return 404 when appointment does not exist", async () => {
      const query = {
        populate: jest.fn(),
      };

      query.populate.mockReturnValue(query);

      query.populate.mockImplementationOnce(
        () => query
      );

      query.populate.mockImplementationOnce(
        () => query
      );

      query.populate.mockImplementationOnce(
        () => ({
          then: (resolve) =>
            resolve(null),
        })
      );

      mockAppointmentModel.findById.mockReturnValue(
        query
      );

      const response = await request(app)
        .get(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        );

      expect(response.statusCode).toBe(404);

      expect(response.body.success).toBe(false);

      expect(response.body.message).toBe(
        "Appointment not found"
      );
    });
  });



  // PATCH /api/appointments/:id


  describe("PATCH /api/appointments/:id", () => {
    test("admin should update appointment", async () => {
      mockAppointmentModel.findById.mockResolvedValue(
        mockAppointment
      );

      mockAppointmentModel.findByIdAndUpdate.mockResolvedValue(
        updatedAppointment
      );

      const response = await request(app)
        .patch(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          status: "confirmed",
        });

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);

      expect(
        response.body.data.appointment
      ).toEqual({
        ...updatedAppointment,
        appointmentDate:
          updatedAppointment.appointmentDate.toISOString(),
      });

      expect(
        mockAppointmentModel.findByIdAndUpdate
      ).toHaveBeenCalledWith(
        appointmentId,
        {
          status: "confirmed",
        },
        {
          new: true,
          runValidators: true,
        }
      );
    });

    test("patient should not update appointment", async () => {
      const response = await request(app)
        .patch(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        )
        .send({
          status: "confirmed",
        });

      expect(response.statusCode).toBe(403);

      expect(response.body.success).toBe(false);
    });

    test("should reject invalid status", async () => {
      const response = await request(app)
        .patch(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({
          status: "invalid-status",
        });

      expect(response.statusCode).toBe(400);

      expect(response.body.success).toBe(false);
    });

    test("should reject empty update body", async () => {
      const response = await request(app)
        .patch(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        )
        .send({});

      expect(response.statusCode).toBe(400);

      expect(response.body.success).toBe(false);
    });

test("should return 400 when appointment does not exist", async () => {
  mockAppointmentModel.findById.mockResolvedValue(null);

  const response = await request(app)
    .patch(`/api/appointments/${appointmentId}`)
    .set(
      "Authorization",
      `Bearer ${adminToken}`
    )
    .send({
      status: "confirmed",
    });

  expect(response.statusCode).toBe(400);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe(
    "Appointment not found"
  );
});
  });

  // DELETE /api/appointments/:id

  describe("DELETE /api/appointments/:id", () => {
    test("admin should delete appointment", async () => {
      mockAppointmentModel.findById.mockResolvedValue(
        mockAppointment
      );

      mockAppointmentModel.findByIdAndDelete.mockResolvedValue(
        mockAppointment
      );

      const response = await request(app)
        .delete(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        );

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);

      expect(response.body.message).toBe(
        "Appointment deleted successfully"
      );

      expect(
        mockAppointmentModel.findByIdAndDelete
      ).toHaveBeenCalledWith(appointmentId);
    });

    test("patient should not delete appointment", async () => {
      const response = await request(app)
        .delete(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${patientToken}`
        );

      expect(response.statusCode).toBe(403);

      expect(response.body.success).toBe(false);
    });

    test("should return 404 when appointment does not exist", async () => {
      mockAppointmentModel.findById.mockResolvedValue(
        null
      );

      const response = await request(app)
        .delete(
          `/api/appointments/${appointmentId}`
        )
        .set(
          "Authorization",
          `Bearer ${adminToken}`
        );

      expect(response.statusCode).toBe(404);

      expect(response.body.success).toBe(false);
    });

    test("unauthenticated user should not delete appointment", async () => {
      const response = await request(app).delete(
        `/api/appointments/${appointmentId}`
      );

      expect(response.statusCode).toBe(401);

      expect(response.body.success).toBe(false);
    });
  });
});