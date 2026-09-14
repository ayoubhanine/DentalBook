import { jest } from "@jest/globals";

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

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn(),
  },
}));

const { default: User } = await import("../../src/models/user.model.js");
const bcrypt = (await import("bcrypt")).default;
const jwt = (await import("jsonwebtoken")).default;

const { register, login, getMe } = await import(
  "../../src/services/auth.service.js"
);

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1h";
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      User.findOne.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("hashed-password");

      const createdUser = {
        _id: "user123",
        firstName: "Ayoub",
        lastName: "Hanine",
        email: "ayoub@test.com",
        password: "hashed-password",
        phone: "0600000000",
        role: "patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      User.create.mockResolvedValue(createdUser);

      jwt.sign.mockReturnValue("fake-jwt-token");

      const result = await register({
        firstName: "Ayoub",
        lastName: "Hanine",
        email: "ayoub@test.com",
        password: "password123",
        phone: "0600000000",
      });

      expect(User.findOne).toHaveBeenCalledWith({
        email: "ayoub@test.com",
      });

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);

      expect(User.create).toHaveBeenCalledWith({
        firstName: "Ayoub",
        lastName: "Hanine",
        email: "ayoub@test.com",
        password: "hashed-password",
        phone: "0600000000",
      });

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: "user123",
          role: "patient",
        },
        "test-secret",
        {
          expiresIn: "1h",
        }
      );

      expect(result.token).toBe("fake-jwt-token");
      expect(result.user.email).toBe("ayoub@test.com");
      expect(result.user.role).toBe("patient");
    });

    it("should reject registration if email already exists", async () => {
      User.findOne.mockResolvedValue({
        _id: "existing-user",
        email: "ayoub@test.com",
      });

      await expect(
        register({
          firstName: "Ayoub",
          lastName: "Hanine",
          email: "ayoub@test.com",
          password: "password123",
          phone: "0600000000",
        })
      ).rejects.toThrow("Email already exists");

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(User.create).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("should login successfully with correct credentials", async () => {
      const user = {
        _id: "user123",
        firstName: "Ayoub",
        lastName: "Hanine",
        email: "ayoub@test.com",
        password: "hashed-password",
        phone: "0600000000",
        role: "patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const selectMock = jest.fn().mockResolvedValue(user);

      User.findOne.mockReturnValue({
        select: selectMock,
      });

      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockReturnValue("fake-jwt-token");

      const result = await login(
        "ayoub@test.com",
        "password123"
      );

      expect(User.findOne).toHaveBeenCalledWith({
        email: "ayoub@test.com",
      });

      expect(selectMock).toHaveBeenCalledWith("+password");

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashed-password"
      );

      expect(result.token).toBe("fake-jwt-token");
      expect(result.user.email).toBe("ayoub@test.com");
    });

    it("should reject login if user does not exist", async () => {
      const selectMock = jest.fn().mockResolvedValue(null);

      User.findOne.mockReturnValue({
        select: selectMock,
      });

      await expect(
        login("unknown@test.com", "password123")
      ).rejects.toThrow("Invalid email or password");

      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it("should reject login if password is incorrect", async () => {
      const user = {
        _id: "user123",
        email: "ayoub@test.com",
        password: "hashed-password",
      };

      const selectMock = jest.fn().mockResolvedValue(user);

      User.findOne.mockReturnValue({
        select: selectMock,
      });

      bcrypt.compare.mockResolvedValue(false);

      await expect(
        login("ayoub@test.com", "wrong-password")
      ).rejects.toThrow("Invalid email or password");

      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

  describe("getMe", () => {
    it("should return the current user", async () => {
      const user = {
        _id: "user123",
        firstName: "Ayoub",
        lastName: "Hanine",
        email: "ayoub@test.com",
        phone: "0600000000",
        role: "patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      User.findById.mockResolvedValue(user);

      const result = await getMe("user123");

      expect(User.findById).toHaveBeenCalledWith("user123");

      expect(result).toEqual({
        id: "user123",
        firstName: "Ayoub",
        lastName: "Hanine",
        email: "ayoub@test.com",
        phone: "0600000000",
        role: "patient",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });

    it("should throw an error if user does not exist", async () => {
      User.findById.mockResolvedValue(null);

      await expect(
        getMe("unknown-user")
      ).rejects.toThrow("User not found");
    });
  });
});