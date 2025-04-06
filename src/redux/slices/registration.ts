import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRegistrationForm } from '../../@types/user';
// utils

// ----------------------------------------------------------------------

const initialState : IRegistrationForm = {
  isLoading: false,
  error: null,
  activeStep: 0,

  registrationInformation: {
    generalInformation: {
      userState: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: null,
        nationalIdNumber: "",
      },

      healthInsuranceState: {
        insuranceCardNumber: "",
        expirationDate: null,
        registeredHospital: "",
      },

      roomState: {
        roomId: "",
        buildingId: "",
        roomTypeId: "",
        gender: "",
      },

      guardianState: [
        {
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          relationshipToUser: "",
        }
      ],

      workplaceId: "",
      startDate: null,
      endDate: null,      
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

    // END LOADING
    endLoading(state) {
      state.isLoading = false;
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

    updateGeneralInformation(
      state,
      action: PayloadAction<IRegistrationForm['registrationInformation']['generalInformation']>
    ) {
      state.registrationInformation.generalInformation = {
        ...state.registrationInformation.generalInformation,
        ...action.payload,
      };
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
  updateGeneralInformation,
  resetForm,
  // startLoading,
  // endLoading,
} = slice.actions;

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
