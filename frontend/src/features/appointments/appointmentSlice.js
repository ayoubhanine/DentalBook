import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";

export const getAppointments = createAsyncThunk(
  "appointments/getAll",
  async (_, thunkAPI) => {
    try {
      return await appointmentService.getAppointments();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch appointments";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAppointmentById = createAsyncThunk(
  "appointments/getById",
  async (id, thunkAPI) => {
    try {
      return await appointmentService.getAppointmentById(id);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch appointment";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async ({ id, appointmentData }, thunkAPI) => {
    try {
      return await appointmentService.updateAppointment(
        id,
        appointmentData
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update appointment";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete appointment
export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id, thunkAPI) => {
    try {
      await appointmentService.deleteAppointment(id);

      return id;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete appointment";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  appointments: [],
  selectedAppointment: null,

  isLoading: false,
  isUpdating: false,
  isDeleting: false,

  isError: false,
  isSuccess: false,
  message: "",
};

const appointmentSlice = createSlice({
  name: "appointments",

  initialState,

  reducers: {
    resetAppointments: (state) => {
      state.appointments = [];
      state.selectedAppointment = null;
      state.isLoading = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },

    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
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

        state.appointments =
          action.payload.data?.appointments || [];
      })

      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAppointmentById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })

      .addCase(getAppointmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.selectedAppointment =
          action.payload.data?.appointment ||
          action.payload.data ||
          null;
      })

      .addCase(getAppointmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })



      .addCase(updateAppointment.pending, (state) => {
        state.isUpdating = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        state.isError = false;

        const updatedAppointment =
          action.payload.data?.appointment;

        if (updatedAppointment) {
          const index = state.appointments.findIndex(
            (appointment) =>
              appointment._id === updatedAppointment._id
          );

          if (index !== -1) {
            state.appointments[index] = updatedAppointment;
          }

          if (
            state.selectedAppointment?._id ===
            updatedAppointment._id
          ) {
            state.selectedAppointment = updatedAppointment;
          }
        }
      })

      .addCase(updateAppointment.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(deleteAppointment.pending, (state) => {
        state.isDeleting = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isSuccess = true;
        state.isError = false;

        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        );

        if (
          state.selectedAppointment?._id === action.payload
        ) {
          state.selectedAppointment = null;
        }
      })

      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const {
  resetAppointments,
  clearSelectedAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;