import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import scheduleService from "./scheduleService";

export const getSchedules = createAsyncThunk(
  "schedules/getAll",
  async (_, thunkAPI) => {
    try {
      return await scheduleService.getSchedules();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch schedules";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getScheduleById = createAsyncThunk(
  "schedules/getById",
  async (id, thunkAPI) => {
    try {
      return await scheduleService.getScheduleById(id);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch schedule";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const createSchedule = createAsyncThunk(
  "schedules/create",
  async (scheduleData, thunkAPI) => {
    try {
      return await scheduleService.createSchedule(scheduleData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create schedule";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const updateSchedule = createAsyncThunk(
  "schedules/update",
  async ({ id, scheduleData }, thunkAPI) => {
    try {
      return await scheduleService.updateSchedule(
        id,
        scheduleData
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update schedule";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const deleteSchedule = createAsyncThunk(
  "schedules/delete",
  async (id, thunkAPI) => {
    try {
      await scheduleService.deleteSchedule(id);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete schedule";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  schedules: [],
  selectedSchedule: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const scheduleSlice = createSlice({
  name: "schedules",

  initialState,

  reducers: {
    resetSchedules: (state) => {
      state.schedules = [];
      state.selectedSchedule = null;
      state.isLoading = false;
      state.isCreating = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },

    clearSelectedSchedule: (state) => {
      state.selectedSchedule = null;
    },

    resetScheduleStatus: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

     
      .addCase(getSchedules.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })

      .addCase(getSchedules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.schedules =
          action.payload.data?.schedules || [];
      })

      .addCase(getSchedules.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      
      .addCase(getScheduleById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })

      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.selectedSchedule =
          action.payload.data?.schedule ||
          action.payload.data ||
          null;
      })

      .addCase(getScheduleById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

   
      .addCase(createSchedule.pending, (state) => {
        state.isCreating = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(createSchedule.fulfilled, (state, action) => {
        state.isCreating = false;
        state.isSuccess = true;
        state.isError = false;

        const newSchedule =
          action.payload.data?.schedule;

        if (newSchedule) {
          state.schedules.unshift(newSchedule);
        }
      })

      .addCase(createSchedule.rejected, (state, action) => {
        state.isCreating = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

    
      .addCase(updateSchedule.pending, (state) => {
        state.isUpdating = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        state.isError = false;

        const updatedSchedule =
          action.payload.data?.schedule;

        if (updatedSchedule) {
          const index = state.schedules.findIndex(
            (schedule) =>
              schedule._id === updatedSchedule._id
          );

          if (index !== -1) {
            state.schedules[index] = updatedSchedule;
          }

          if (
            state.selectedSchedule?._id ===
            updatedSchedule._id
          ) {
            state.selectedSchedule = updatedSchedule;
          }
        }
      })

      .addCase(updateSchedule.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      
      .addCase(deleteSchedule.pending, (state) => {
        state.isDeleting = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isSuccess = true;
        state.isError = false;

        state.schedules = state.schedules.filter(
          (schedule) => schedule._id !== action.payload
        );

        if (
          state.selectedSchedule?._id === action.payload
        ) {
          state.selectedSchedule = null;
        }
      })

      .addCase(deleteSchedule.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const {
  resetSchedules,
  clearSelectedSchedule,
  resetScheduleStatus,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;