import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/service.model.js", () => ({
  default: {
    findOne: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const { default: Service } = await import(
  "../../src/models/service.model.js"
);

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = await import("../../src/services/service.service.js");

describe("Service Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createService", () => {
    it("should create a new service successfully", async () => {
      Service.findOne.mockResolvedValue(null);

      const serviceData = {
        name: "Détartrage",
        description: "Nettoyage des dents",
        duration: 45,
        price: 250,
      };

      const createdService = {
        _id: "service123",
        ...serviceData,
        isActive: true,
      };

      Service.create.mockResolvedValue(createdService);

      const result = await createService(serviceData);

      expect(Service.findOne).toHaveBeenCalledWith({
        name: {
          $regex: "^Détartrage$",
          $options: "i",
        },
      });

      expect(Service.create).toHaveBeenCalledWith(serviceData);

      expect(result).toEqual(createdService);
    });

    it("should reject creation if service name already exists", async () => {
      Service.findOne.mockResolvedValue({
        _id: "existing-service",
        name: "Détartrage",
      });

      await expect(
        createService({
          name: "Détartrage",
          description: "Test",
          duration: 45,
          price: 250,
        })
      ).rejects.toThrow("A service with this name already exists");

      expect(Service.create).not.toHaveBeenCalled();
    });
  });

  describe("getAllServices", () => {
    it("should return all services sorted by creation date", async () => {
      const services = [
        {
          _id: "service2",
          name: "Blanchiment",
        },
        {
          _id: "service1",
          name: "Détartrage",
        },
      ];

      const sortMock = jest.fn().mockResolvedValue(services);

      Service.find.mockReturnValue({
        sort: sortMock,
      });

      const result = await getAllServices();

  expect(Service.find).toHaveBeenCalledWith();

      expect(sortMock).toHaveBeenCalledWith({
        createdAt: -1,
      });

      expect(result).toEqual(services);
    });
  });

  describe("getServiceById", () => {
    it("should return a service by id", async () => {
      const service = {
        _id: "service123",
        name: "Détartrage",
        duration: 45,
        price: 250,
      };

      Service.findById.mockResolvedValue(service);

      const result = await getServiceById("service123");

      expect(Service.findById).toHaveBeenCalledWith("service123");

      expect(result).toEqual(service);
    });

    it("should throw an error if service does not exist", async () => {
      Service.findById.mockResolvedValue(null);

      await expect(
        getServiceById("unknown-id")
      ).rejects.toThrow("Service not found");
    });
  });

  describe("updateService", () => {
    it("should update a service successfully", async () => {
      const existingService = {
        _id: "service123",
        name: "Détartrage",
        duration: 45,
        price: 250,
      };

      const updatedService = {
        _id: "service123",
        name: "Détartrage Premium",
        duration: 60,
        price: 300,
      };

      Service.findById.mockResolvedValue(existingService);
      Service.findOne.mockResolvedValue(null);
      Service.findByIdAndUpdate.mockResolvedValue(updatedService);

      const updateData = {
        name: "Détartrage Premium",
        duration: 60,
        price: 300,
      };

      const result = await updateService(
        "service123",
        updateData
      );

      expect(Service.findById).toHaveBeenCalledWith("service123");

      expect(Service.findOne).toHaveBeenCalledWith({
        name: {
          $regex: "^Détartrage Premium$",
          $options: "i",
        },
        _id: {
          $ne: "service123",
        },
      });

      expect(Service.findByIdAndUpdate).toHaveBeenCalledWith(
        "service123",
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedService);
    });

    it("should reject update if service does not exist", async () => {
      Service.findById.mockResolvedValue(null);

      await expect(
        updateService("unknown-id", {
          name: "New Service",
        })
      ).rejects.toThrow("Service not found");

      expect(Service.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("should reject update if the new name already exists", async () => {
      Service.findById.mockResolvedValue({
        _id: "service123",
        name: "Détartrage",
      });

      Service.findOne.mockResolvedValue({
        _id: "service456",
        name: "Blanchiment",
      });

      await expect(
        updateService("service123", {
          name: "Blanchiment",
        })
      ).rejects.toThrow("A service with this name already exists");

      expect(Service.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("should update service without checking duplicate name when name is not provided", async () => {
      const existingService = {
        _id: "service123",
        name: "Détartrage",
      };

      const updatedService = {
        _id: "service123",
        name: "Détartrage",
        price: 300,
      };

      Service.findById.mockResolvedValue(existingService);
      Service.findByIdAndUpdate.mockResolvedValue(updatedService);

      const result = await updateService(
        "service123",
        {
          price: 300,
        }
      );

      expect(Service.findOne).not.toHaveBeenCalled();

      expect(Service.findByIdAndUpdate).toHaveBeenCalledWith(
        "service123",
        {
          price: 300,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedService);
    });
  });

  describe("deleteService", () => {
    it("should delete and return the service successfully", async () => {
      const service = {
        _id: "service123",
        name: "Détartrage",
      };

      Service.findById.mockResolvedValue(service);
      Service.findByIdAndDelete.mockResolvedValue(service);

      const result = await deleteService("service123");

      expect(Service.findById).toHaveBeenCalledWith("service123");

      expect(Service.findByIdAndDelete).toHaveBeenCalledWith(
        "service123"
      );

      expect(result).toEqual(service);
    });

    it("should throw an error if service does not exist", async () => {
      Service.findById.mockResolvedValue(null);

      await expect(
        deleteService("unknown-id")
      ).rejects.toThrow("Service not found");

      expect(Service.findByIdAndDelete).not.toHaveBeenCalled();
    });
  });
});