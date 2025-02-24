import { createSlice } from '@reduxjs/toolkit';
import { IRegistrationForm } from '../../@types/user';
// utils

// ----------------------------------------------------------------------

const initialState : IRegistrationForm = {
  isLoading: false,
  error: null,
  activeStep: 0,

  registrationInformation: {
    generalInformation: {
      userID: 0,
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: null,
      nationalIDNumber: "",
      status: "",
      contractID: 0,
      priorities: [], // Default empty array for multiple selections

      guardian: {
        guardianID: 0,
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        relationshipToUser: "",
      },

      workplace: {
        workplaceID: 0,
        name: "",
        address: "",
        createdAt: null,
        createdBy: "",
        abbreviation: "",
      },

      healthInsurance: {
        insuranceCardNumber: "",
        expirationDate: null,
        registeredHospital: "",
      },
    },
    
    documents: {
      portraitPhoto: null,
      educationPhoto: null,
      nationalIDPhotosFront: null,
      nationalIDPhotosBack: null,
    },
    
  },
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    backStep(state) {
      state.activeStep -= 1;
    },

    nextStep(state) {
      state.activeStep += 1;
    },

    resetForm(state) {
      state.registrationInformation = { ...initialState.registrationInformation };
      state.activeStep = 0; // Reset step to the beginning if needed
      state.error = null; // Clear any errors
    },


  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  backStep,
  nextStep,
  resetForm,
} = slice.actions;

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
