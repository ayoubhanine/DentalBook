import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";
import serviceReducer from "../features/services/serviceSlice";
import scheduleReducer from "../features/schedules/scheduleSlice";
import patientReducer from "../features/patients/patientSlice";
export const store=configureStore({
    reducer:{
        auth:authReducer,
        appointments: appointmentReducer,
        services: serviceReducer,
       schedules: scheduleReducer,
       patients: patientReducer,
    },
})