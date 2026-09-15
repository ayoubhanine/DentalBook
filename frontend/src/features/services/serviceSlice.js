import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serviceService from "./serviceService";


export const getServices = createAsyncThunk(
  "services/getAll",
  async (_, thunkAPI) => {
    try {
      return await serviceService.getServices();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch services";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getServiceById = createAsyncThunk(
  "services/getById",
  async (id, thunkAPI) => {
    try {
      return await serviceService.getServiceById(id);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch service";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const createService = createAsyncThunk(
  "services/create",
  async (serviceData, thunkAPI) => {
    try {
      return await serviceService.createService(serviceData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create service";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, serviceData }, thunkAPI) => {
    try {
      return await serviceService.updateService(
        id,
        serviceData
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update service";

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, thunkAPI) => {
    try {
      await serviceService.deleteService(id);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete service";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  services: [],
  selectedService: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const serviceSlice = createSlice({
  name: "services",
  initialState,

  reducers: {
    resetServices: (state) => {
      state.services = [];
      state.selectedService = null;
      state.isLoading = false;
      state.isCreating = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },

    clearSelectedService: (state) => {
      state.selectedService = null;
    },

    resetServiceStatus: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })

      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.services =
          action.payload.data?.services || [];
      })

      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET BY ID
      .addCase(getServiceById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })

      .addCase(getServiceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.selectedService =
          action.payload.data?.service ||
          action.payload.data ||
          null;
      })

      .addCase(getServiceById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

  
      .addCase(createService.pending, (state) => {
        state.isCreating = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(createService.fulfilled, (state, action) => {
        state.isCreating = false;
        state.isSuccess = true;
        state.isError = false;

        const newService =
          action.payload.data?.service;

        if (newService) {
          state.services.unshift(newService);
        }
      })

      .addCase(createService.rejected, (state, action) => {
        state.isCreating = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

     
      .addCase(updateService.pending, (state) => {
        state.isUpdating = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(updateService.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        state.isError = false;

        const updatedService =
          action.payload.data?.service;

        if (updatedService) {
          const index = state.services.findIndex(
            (service) =>
              service._id === updatedService._id
          );

          if (index !== -1) {
            state.services[index] = updatedService;
          }

          if (
            state.selectedService?._id ===
            updatedService._id
          ) {
            state.selectedService = updatedService;
          }
        }
      })

      .addCase(updateService.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

   
      .addCase(deleteService.pending, (state) => {
        state.isDeleting = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(deleteService.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isSuccess = true;
        state.isError = false;

        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );

        if (
          state.selectedService?._id === action.payload
        ) {
          state.selectedService = null;
        }
      })

      .addCase(deleteService.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const {
  resetServices,
  clearSelectedService,
  resetServiceStatus,
} = serviceSlice.actions;

export default serviceSlice.reducer;