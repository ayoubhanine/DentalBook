import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";

export const getAppointments = createAsyncThunk(
  "appointments/getAll",
  async (_, thunkAPI) => {
    try {
      return await appointmentService.getAppointments();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch appointments";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  appointments: [],
  isLoading: false,
  isError: false,
  message: "",
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    resetAppointments: (state) => {
      state.appointments = [];
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.appointments = action.payload.data?.appointments || [];
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAppointments } = appointmentSlice.actions;

export default appointmentSlice.reducer;