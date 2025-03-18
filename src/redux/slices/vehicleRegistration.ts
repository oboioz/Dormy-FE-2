import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IParkingRequest } from '../../@types/vehicle';

// ----------------------------------------------------------------------

const initialState: IParkingRequest & { isLoading: boolean; error: string | null;} = {
  isLoading: false,
  error: null,

  parkingRequestID: 0, // Default ID
  status: "pending", // Default status
  timestamp: new Date(), // Default timestamp

  userID: {
    userID: 0,
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "Other",
    dateOfBirth: new Date(),
    nationalIDNumber: "",
    status: "",
    contractID: null,
    priorities: [],

    guardian: {
      guardianID: 0,
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      relationshipToUser: "",
    },

    workplace: null,
    healthInsurance: null,
  },

  parkingSpotID: {
    parkingSpotID: 0,
    location: "",
    capacity: 0,
    availability: true,
  },

  vehicleID: {
    vehicleID: 0,
    licensePlate: "",
    model: "",
    color: "",
    ownerID: 0,
  },

  approverID: {
    adminID: 0,
    name: "",
    role: "",
    email: "",
  },
};

const slice = createSlice({
  name: "parkingRequest",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setParkingRequest(state, action: PayloadAction<Partial<IParkingRequest>>) {
      return { ...state, ...action.payload };
    },

    resetForm(state) {
      return { ...initialState };
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, setParkingRequest, resetForm } = slice.actions;
