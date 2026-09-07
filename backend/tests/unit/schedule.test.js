import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/schedule.model.js", () => ({
  default: {
    findOne: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const { default: Schedule } = await import(
  "../../src/models/schedule.model.js"
);

const {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = await import("../../src/services/schedule.service.js");

describe("Schedule Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createSchedule", () => {
    it("should create a new schedule successfully", async () => {
      const scheduleData = {
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
        isAvailable: true,
      };

      const createdSchedule = {
        _id: "schedule123",
        ...scheduleData,
      };

      Schedule.findOne.mockResolvedValue(null);
      Schedule.create.mockResolvedValue(createdSchedule);

      const result = await createSchedule(scheduleData);

      expect(Schedule.findOne).toHaveBeenCalledWith({
        day: "Monday",
      });

      expect(Schedule.create).toHaveBeenCalledWith(scheduleData);
      expect(result).toEqual(createdSchedule);
    });

    it("should reject creation if a schedule already exists for the day", async () => {
      Schedule.findOne.mockResolvedValue({
        _id: "existing-schedule",
        day: "Monday",
      });

      await expect(
        createSchedule({
          day: "Monday",
          startTime: "09:00",
          endTime: "18:00",
        })
      ).rejects.toThrow("A schedule already exists for this day");

      expect(Schedule.create).not.toHaveBeenCalled();
    });
  });

  describe("getAllSchedules", () => {
    it("should return all schedules sorted by day", async () => {
      const schedules = [
        {
          _id: "schedule1",
          day: "Monday",
          startTime: "09:00",
          endTime: "18:00",
        },
        {
          _id: "schedule2",
          day: "Tuesday",
          startTime: "09:00",
          endTime: "18:00",
        },
      ];

      const sortMock = jest.fn().mockResolvedValue(schedules);

      Schedule.find.mockReturnValue({
        sort: sortMock,
      });

      const result = await getAllSchedules();

      expect(Schedule.find).toHaveBeenCalledWith();
      expect(sortMock).toHaveBeenCalledWith({ day: 1 });
      expect(result).toEqual(schedules);
    });
  });

  describe("getScheduleById", () => {
    it("should return a schedule by id", async () => {
      const schedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      Schedule.findById.mockResolvedValue(schedule);

      const result = await getScheduleById("schedule123");

      expect(Schedule.findById).toHaveBeenCalledWith("schedule123");
      expect(result).toEqual(schedule);
    });

    it("should throw an error if schedule does not exist", async () => {
      Schedule.findById.mockResolvedValue(null);

      await expect(
        getScheduleById("unknown-id")
      ).rejects.toThrow("Schedule not found");
    });
  });

  describe("updateSchedule", () => {
    it("should update a schedule successfully", async () => {
      const existingSchedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      const updateData = {
        startTime: "10:00",
        endTime: "17:00",
      };

      const updatedSchedule = {
        ...existingSchedule,
        ...updateData,
      };

      Schedule.findById.mockResolvedValue(existingSchedule);
      Schedule.findByIdAndUpdate.mockResolvedValue(updatedSchedule);

      const result = await updateSchedule("schedule123", updateData);

      expect(Schedule.findById).toHaveBeenCalledWith("schedule123");

      expect(Schedule.findByIdAndUpdate).toHaveBeenCalledWith(
        "schedule123",
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedSchedule);
    });

    it("should reject update if schedule does not exist", async () => {
      Schedule.findById.mockResolvedValue(null);

      await expect(
        updateSchedule("unknown-id", {
          startTime: "10:00",
          endTime: "17:00",
        })
      ).rejects.toThrow("Schedule not found");

      expect(Schedule.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("should reject update if end time is before start time", async () => {
      const existingSchedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      Schedule.findById.mockResolvedValue(existingSchedule);

      await expect(
        updateSchedule("schedule123", {
          startTime: "18:00",
          endTime: "09:00",
        })
      ).rejects.toThrow("End time must be after start time");

      expect(Schedule.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("should reject update if start time equals end time", async () => {
      const existingSchedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      Schedule.findById.mockResolvedValue(existingSchedule);

      await expect(
        updateSchedule("schedule123", {
          startTime: "10:00",
          endTime: "10:00",
        })
      ).rejects.toThrow("End time must be after start time");

      expect(Schedule.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("should reject update if the new day already has a schedule", async () => {
      const existingSchedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      Schedule.findById.mockResolvedValue(existingSchedule);

      Schedule.findOne.mockResolvedValue({
        _id: "schedule456",
        day: "Tuesday",
      });

      await expect(
        updateSchedule("schedule123", {
          day: "Tuesday",
          startTime: "10:00",
          endTime: "17:00",
        })
      ).rejects.toThrow("A schedule already exists for this day");

      expect(Schedule.findOne).toHaveBeenCalledWith({
        day: "Tuesday",
        _id: { $ne: "schedule123" },
      });

      expect(Schedule.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("should update schedule when changing to a free day", async () => {
      const existingSchedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      const updateData = {
        day: "Tuesday",
        startTime: "10:00",
        endTime: "17:00",
      };

      const updatedSchedule = {
        ...existingSchedule,
        ...updateData,
      };

      Schedule.findById.mockResolvedValue(existingSchedule);
      Schedule.findOne.mockResolvedValue(null);
      Schedule.findByIdAndUpdate.mockResolvedValue(updatedSchedule);

      const result = await updateSchedule("schedule123", updateData);

      expect(Schedule.findOne).toHaveBeenCalledWith({
        day: "Tuesday",
        _id: { $ne: "schedule123" },
      });

      expect(Schedule.findByIdAndUpdate).toHaveBeenCalledWith(
        "schedule123",
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedSchedule);
    });

    it("should update schedule without checking duplicate day when day is not changed", async () => {
      const existingSchedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      const updateData = {
        startTime: "10:00",
        endTime: "17:00",
      };

      const updatedSchedule = {
        ...existingSchedule,
        ...updateData,
      };

      Schedule.findById.mockResolvedValue(existingSchedule);
      Schedule.findByIdAndUpdate.mockResolvedValue(updatedSchedule);

      const result = await updateSchedule("schedule123", updateData);

      expect(Schedule.findOne).not.toHaveBeenCalled();

      expect(Schedule.findByIdAndUpdate).toHaveBeenCalledWith(
        "schedule123",
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedSchedule);
    });
  });

  describe("deleteSchedule", () => {
    it("should delete and return the schedule successfully", async () => {
      const schedule = {
        _id: "schedule123",
        day: "Monday",
        startTime: "09:00",
        endTime: "18:00",
      };

      Schedule.findById.mockResolvedValue(schedule);
      Schedule.findByIdAndDelete.mockResolvedValue(schedule);

      const result = await deleteSchedule("schedule123");

      expect(Schedule.findById).toHaveBeenCalledWith("schedule123");
      expect(Schedule.findByIdAndDelete).toHaveBeenCalledWith("schedule123");
      expect(result).toEqual(schedule);
    });

    it("should throw an error if schedule does not exist", async () => {
      Schedule.findById.mockResolvedValue(null);

      await expect(
        deleteSchedule("unknown-id")
      ).rejects.toThrow("Schedule not found");

      expect(Schedule.findByIdAndDelete).not.toHaveBeenCalled();
    });
  });
});