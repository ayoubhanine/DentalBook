import dotenv from "dotenv";
 import bcrypt from "bcrypt";
  import mongoose from "mongoose";
   import User from "../models/user.model.js";
    dotenv.config(); 
    const seedAdmin = async () =>
      { try { await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected"); 
    const existingAdmin = await User.findOne({ role: "admin", });
         if (existingAdmin) { console.log("Admin already exists"); 
            return; } const hashedPassword = await bcrypt.hash("Admin123456", 10); 
             const admin = await User.create(
            { firstName: "Admin",
              lastName: "DentalBook",
       email: "admin@dentalbook.com",
       password: hashedPassword,
        phone: "0600000000", 
        role: "admin", });
        console.log("Admin created successfully");
       console.log({ id: admin._id, 
        email: admin.email,
         role: admin.role, });
        } catch (error)
         { console.error("Error creating admin:", error.message); } 
        finally { await mongoose.disconnect(); console.log("MongoDB disconnected"); } }; 
       seedAdmin();