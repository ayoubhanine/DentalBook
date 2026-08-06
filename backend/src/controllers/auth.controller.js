import { register } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const { user, token } = await register(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};