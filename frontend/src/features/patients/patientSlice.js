import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getPatients,
  getPatientById,
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



const initialState = {
  patients: [],
  selectedPatient: null,
  isLoading: false,
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

  },
});

export const { clearSelectedPatient } =
  patientSlice.actions;

export default patientSlice.reducer;