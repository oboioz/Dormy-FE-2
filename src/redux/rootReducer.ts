import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import registrationReducer from "./slices/registration";
import vehicleRegistrationReducer from "./slices/vehicleRegistration"; // Import the vehicle registration slice

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["registration", "vehicleRegistration"], // Persist both
};

export const registrationPersistConfig = {
  key: "registration",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

// export const vehicleRegistrationPersistConfig = {
//   key: "vehicleRegistration",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: [],
// };

const rootReducer = combineReducers({
  registration: persistReducer(registrationPersistConfig, registrationReducer),
  // vehicleRegistration: persistReducer(vehicleRegistrationPersistConfig, vehicleRegistrationReducer), // Fix here
});

export default rootReducer;
