import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/appointment.model.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

jest.unstable_mockModule("../../src/models/user.model.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule("../../src/models/service.model.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule("../../src/models/schedule.model.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

const { default: Appointment } = await import(
  "../../src/models/appointment.model.js"
);

const { default: User } = await import(
  "../../src/models/user.model.js"
);

const { default: Service } = await import(
  "../../src/models/service.model.js"
);

const { default: Schedule } = await import(
  "../../src/models/schedule.model.js"
);

const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUser,
  updateAppointment,
  deleteAppointment,
} = await import("../../src/services/appointment.service.js");

describe("Appointment Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createAppointment", () => {
    const appointmentData = {
      userId: "user123",
      serviceId: "service123",
      scheduleId: "schedule123",
      appointmentDate: "2026-09-14T10:00:00",
      notes: "Regular appointment",
    };

    const user = {
      _id: "user123",
      firstName: "John",
    };

    const service = {
      _id: "service123",
      name: "Détartrage",
      duration: 45,
      price: 250,
    };

    const schedule = {
      _id: "schedule123",
      day: "Monday",
      startTime: "09:00",
      endTime: "18:00",
      isAvailable: true,
    };

    it("should create an appointment successfully", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(schedule);

      const populateMock = jest.fn().mockResolvedValue([]);
      Appointment.find.mockReturnValue({
        populate: populateMock,
      });

      const createdAppointment = {
        _id: "appointment123",
        ...appointmentData,
        status: "pending",
      };

      Appointment.create.mockResolvedValue(createdAppointment);

      const result = await createAppointment(appointmentData);

      expect(User.findById).toHaveBeenCalledWith("user123");
      expect(Service.findById).toHaveBeenCalledWith("service123");
      expect(Schedule.findById).toHaveBeenCalledWith("schedule123");

      expect(Appointment.find).toHaveBeenCalled();

      expect(Appointment.create).toHaveBeenCalledWith({
        userId: "user123",
        serviceId: "service123",
        scheduleId: "schedule123",
        appointmentDate: expect.any(Date),
        notes: "Regular appointment",
        status: "pending",
      });

      expect(result).toEqual(createdAppointment);
    });

    it("should reject appointment if patient does not exist", async () => {
      User.findById.mockResolvedValue(null);

      await expect(
        createAppointment(appointmentData)
      ).rejects.toThrow("Patient not found");

      expect(Service.findById).not.toHaveBeenCalled();
      expect(Schedule.findById).not.toHaveBeenCalled();
      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if service does not exist", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(null);

      await expect(
        createAppointment(appointmentData)
      ).rejects.toThrow("Service not found");

      expect(Schedule.findById).not.toHaveBeenCalled();
      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if schedule does not exist", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(null);

      await expect(
        createAppointment(appointmentData)
      ).rejects.toThrow("Schedule not found");

      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if schedule is unavailable", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue({
        ...schedule,
        isAvailable: false,
      });

      await expect(
        createAppointment(appointmentData)
      ).rejects.toThrow("This schedule is not available");

      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if date is invalid", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(schedule);

      await expect(
        createAppointment({
          ...appointmentData,
          appointmentDate: "invalid-date",
        })
      ).rejects.toThrow("Invalid appointment date");

      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if date is on the wrong day", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(schedule);

      await expect(
        createAppointment({
          ...appointmentData,
          appointmentDate: "2026-09-15T10:00:00",
        })
      ).rejects.toThrow("Appointment date must be on Monday");

      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if it does not fit in schedule", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(schedule);

      await expect(
        createAppointment({
          ...appointmentData,
          appointmentDate: "2026-09-14T17:30:00",
        })
      ).rejects.toThrow(
        "Appointment must be between 09:00 and 18:00"
      );

      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if time slot is already booked", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(schedule);

      const existingAppointment = {
        appointmentDate: new Date("2026-09-14T10:15:00"),
        userId: "other-user",
        serviceId: {
          duration: 45,
        },
      };

      const populateMock = jest.fn().mockResolvedValue([
        existingAppointment,
      ]);

      Appointment.find.mockReturnValue({
        populate: populateMock,
      });

      await expect(
        createAppointment(appointmentData)
      ).rejects.toThrow("This time slot is already booked");

      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should reject appointment if the same patient has a conflicting appointment", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(schedule);

      const existingAppointment = {
        appointmentDate: new Date("2026-09-14T10:15:00"),
        userId: "user123",
        serviceId: {
          duration: 45,
        },
      };

      const populateMock = jest.fn().mockResolvedValue([
        existingAppointment,
      ]);

      Appointment.find.mockReturnValue({
        populate: populateMock,
      });

      await expect(
        createAppointment(appointmentData)
      ).rejects.toThrow(
        "This time slot is already booked"
      );

      expect(Appointment.create).not.toHaveBeenCalled();
    });

    it("should allow an appointment when there is no time conflict", async () => {
      User.findById.mockResolvedValue(user);
      Service.findById.mockResolvedValue(service);
      Schedule.findById.mockResolvedValue(schedule);

      const existingAppointment = {
        appointmentDate: new Date("2026-09-14T12:00:00"),
        userId: "other-user",
        serviceId: {
          duration: 30,
        },
      };

      const populateMock = jest.fn().mockResolvedValue([
        existingAppointment,
      ]);

      Appointment.find.mockReturnValue({
        populate: populateMock,
      });

      const createdAppointment = {
        _id: "appointment123",
        ...appointmentData,
        status: "pending",
      };

      Appointment.create.mockResolvedValue(createdAppointment);

      const result = await createAppointment(appointmentData);

      expect(Appointment.create).toHaveBeenCalled();
      expect(result).toEqual(createdAppointment);
    });
  });

  describe("getAllAppointments", () => {
    it("should return all appointments sorted by appointment date", async () => {
      const appointments = [
        { _id: "appointment1" },
        { _id: "appointment2" },
      ];

      const sortMock = jest.fn().mockResolvedValue(appointments);

      const populateScheduleMock = jest.fn().mockReturnValue({
        sort: sortMock,
      });

      const populateServiceMock = jest.fn().mockReturnValue({
        populate: populateScheduleMock,
      });

      const populateUserMock = jest.fn().mockReturnValue({
        populate: populateServiceMock,
      });

      Appointment.find.mockReturnValue({
        populate: populateUserMock,
      });

      const result = await getAllAppointments();

      expect(Appointment.find).toHaveBeenCalledWith();

      expect(populateUserMock).toHaveBeenCalledWith(
        "userId",
        "firstName lastName email phone"
      );

      expect(populateServiceMock).toHaveBeenCalledWith(
        "serviceId",
        "name description duration price"
      );

      expect(populateScheduleMock).toHaveBeenCalledWith(
        "scheduleId",
        "day startTime endTime isAvailable"
      );

      expect(sortMock).toHaveBeenCalledWith({
        appointmentDate: 1,
      });

      expect(result).toEqual(appointments);
    });
  });

  describe("getAppointmentById", () => {
    it("should return appointment for admin", async () => {
      const appointment = {
        _id: "appointment123",
        userId: {
          _id: "user123",
        },
      };

      const populate3 = jest.fn().mockResolvedValue(appointment);

      const populate2 = jest.fn().mockReturnValue({
        populate: populate3,
      });

      const populate1 = jest.fn().mockReturnValue({
        populate: populate2,
      });

      Appointment.findById.mockReturnValue({
        populate: populate1,
      });

      const admin = {
        id: "admin123",
        role: "admin",
      };

      const result = await getAppointmentById(
        "appointment123",
        admin
      );

      expect(Appointment.findById).toHaveBeenCalledWith(
        "appointment123"
      );

      expect(result).toEqual(appointment);
    });

    it("should return appointment for its owner", async () => {
      const appointment = {
        _id: "appointment123",
        userId: {
          _id: "user123",
        },
      };

      const populate3 = jest.fn().mockResolvedValue(appointment);

      const populate2 = jest.fn().mockReturnValue({
        populate: populate3,
      });

      const populate1 = jest.fn().mockReturnValue({
        populate: populate2,
      });

      Appointment.findById.mockReturnValue({
        populate: populate1,
      });

      const user = {
        id: "user123",
        role: "patient",
      };

      const result = await getAppointmentById(
        "appointment123",
        user
      );

      expect(result).toEqual(appointment);
    });

    it("should reject if appointment does not exist", async () => {
      const populate3 = jest.fn().mockResolvedValue(null);

      const populate2 = jest.fn().mockReturnValue({
        populate: populate3,
      });

      const populate1 = jest.fn().mockReturnValue({
        populate: populate2,
      });

      Appointment.findById.mockReturnValue({
        populate: populate1,
      });

      await expect(
        getAppointmentById("unknown-id", {
          id: "user123",
          role: "patient",
        })
      ).rejects.toThrow("Appointment not found");
    });

    it("should reject access for another patient", async () => {
      const appointment = {
        _id: "appointment123",
        userId: {
          _id: "another-user",
        },
      };

      const populate3 = jest.fn().mockResolvedValue(appointment);

      const populate2 = jest.fn().mockReturnValue({
        populate: populate3,
      });

      const populate1 = jest.fn().mockReturnValue({
        populate: populate2,
      });

      Appointment.findById.mockReturnValue({
        populate: populate1,
      });

      await expect(
        getAppointmentById("appointment123", {
          id: "user123",
          role: "patient",
        })
      ).rejects.toThrow("Access denied");
    });
  });

  describe("getAppointmentsByUser", () => {
    it("should return appointments for a specific user", async () => {
      const appointments = [
        { _id: "appointment1", userId: "user123" },
        { _id: "appointment2", userId: "user123" },
      ];

      const sortMock = jest.fn().mockResolvedValue(appointments);

      const populateScheduleMock = jest.fn().mockReturnValue({
        sort: sortMock,
      });

      const populateServiceMock = jest.fn().mockReturnValue({
        populate: populateScheduleMock,
      });

      Appointment.find.mockReturnValue({
        populate: populateServiceMock,
      });

      const result = await getAppointmentsByUser("user123");

      expect(Appointment.find).toHaveBeenCalledWith({
        userId: "user123",
      });

      expect(sortMock).toHaveBeenCalledWith({
        appointmentDate: 1,
      });

      expect(result).toEqual(appointments);
    });
  });

  describe("updateAppointment", () => {
    it("should update appointment successfully for owner", async () => {
      const appointment = {
        _id: "appointment123",
        userId: "user123",
      };

      const updatedAppointment = {
        ...appointment,
        status: "confirmed",
      };

      Appointment.findById.mockResolvedValue(appointment);
      Appointment.findByIdAndUpdate.mockResolvedValue(
        updatedAppointment
      );

      const user = {
        id: "user123",
        role: "patient",
      };

      const result = await updateAppointment(
        "appointment123",
        { status: "confirmed" },
        user
      );

      expect(Appointment.findById).toHaveBeenCalledWith(
        "appointment123"
      );

      expect(Appointment.findByIdAndUpdate).toHaveBeenCalledWith(
        "appointment123",
        { status: "confirmed" },
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedAppointment);
    });

    it("should reject update if appointment does not exist", async () => {
      Appointment.findById.mockResolvedValue(null);

      await expect(
        updateAppointment(
          "unknown-id",
          { status: "confirmed" },
          {
            id: "user123",
            role: "patient",
          }
        )
      ).rejects.toThrow("Appointment not found");

      expect(
        Appointment.findByIdAndUpdate
      ).not.toHaveBeenCalled();
    });

    it("should reject update if user is not owner or admin", async () => {
      Appointment.findById.mockResolvedValue({
        _id: "appointment123",
        userId: "another-user",
      });

      await expect(
        updateAppointment(
          "appointment123",
          { status: "confirmed" },
          {
            id: "user123",
            role: "patient",
          }
        )
      ).rejects.toThrow("Access denied");

      expect(
        Appointment.findByIdAndUpdate
      ).not.toHaveBeenCalled();
    });
  });

  describe("deleteAppointment", () => {
    it("should delete appointment successfully for admin", async () => {
      const appointment = {
        _id: "appointment123",
        userId: "user123",
      };

      Appointment.findById.mockResolvedValue(appointment);
      Appointment.findByIdAndDelete.mockResolvedValue(appointment);

      const admin = {
        id: "admin123",
        role: "admin",
      };

      const result = await deleteAppointment(
        "appointment123",
        admin
      );

      expect(Appointment.findById).toHaveBeenCalledWith(
        "appointment123"
      );

      expect(
        Appointment.findByIdAndDelete
      ).toHaveBeenCalledWith("appointment123");

      expect(result).toEqual(appointment);
    });

    it("should reject delete if appointment does not exist", async () => {
      Appointment.findById.mockResolvedValue(null);

      await expect(
        deleteAppointment("unknown-id", {
          id: "user123",
          role: "patient",
        })
      ).rejects.toThrow("Appointment not found");

      expect(
        Appointment.findByIdAndDelete
      ).not.toHaveBeenCalled();
    });

    it("should reject delete if user is not owner or admin", async () => {
      Appointment.findById.mockResolvedValue({
        _id: "appointment123",
        userId: "another-user",
      });

      await expect(
        deleteAppointment("appointment123", {
          id: "user123",
          role: "patient",
        })
      ).rejects.toThrow("Access denied");

      expect(
        Appointment.findByIdAndDelete
      ).not.toHaveBeenCalled();
    });
  });
});