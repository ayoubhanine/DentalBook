import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";
import serviceReducer from "../features/services/serviceSlice";
export const store=configureStore({
    reducer:{
        auth:authReducer,
        appointments: appointmentReducer,
        services: serviceReducer,
    },
})