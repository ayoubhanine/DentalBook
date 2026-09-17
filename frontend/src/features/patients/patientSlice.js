import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getPatients,
  getPatientById,
  getMe,
  updateMe,
} from "./patientService";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPatients();

      return response.data.patients;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch patients"
      );
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  "patients/fetchPatientById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPatientById(id);

      return response.data.patient;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch patient"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "patients/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMe();

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "patients/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateMe(userData);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  }
);



const initialState = {
   patients: [],
   selectedPatient: null,

   currentUser: null,
   isLoading: false,
   isUpdating: false,
   error: null,
};

const patientSlice = createSlice({
  name: "patients",

  initialState,

  reducers: {
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },

  extraReducers: (builder) => {
    builder

     
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })

      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      
      .addCase(fetchPatientById.pending, (state) => {
        state.error = null;
      })

      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.selectedPatient = action.payload;
      })

      .addCase(fetchPatientById.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchMe.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(fetchMe.fulfilled, (state, action) => {
  state.isLoading = false;
  state.currentUser = action.payload;
})

.addCase(fetchMe.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})

.addCase(updateProfile.pending, (state) => {
  state.isUpdating = true;
  state.error = null;
})

.addCase(updateProfile.fulfilled, (state, action) => {
  state.isUpdating = false;
  state.currentUser = action.payload;
})

.addCase(updateProfile.rejected, (state, action) => {
  state.isUpdating = false;
  state.error = action.payload;
})

  },
});

export const { clearSelectedPatient } =
  patientSlice.actions;

export default patientSlice.reducer;