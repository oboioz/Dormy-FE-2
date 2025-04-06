import { REGISTER } from "redux-persist";

export const API_URL = {
  BASE_URL: import.meta.env.VITE_BASE_API_URL,
  ADMIN: {
    SIGN_IN: "auth/admin/sign-in",
  },
  USER: {
    SIGN_IN: "user/sign-in",
    SIGN_UP: "user/sign-up",
    GET_PROFILE: "/user/id/",
  },
  WORKPLACE: {
    GET: "workplace/all",
    GET_SINGLE: "workplace/id/",
    CREATE: "workplace",
    UPDATE: "workplace",
    SOFT_DELETE: "workplace/id/{id}/soft-delete",
  },
  GUARDIAN: {
    GET: "guardian/all",
  },
  ROOM_SERVICE: {
    GET_ENUM: "room-service/room-service-type/all",
    GET_BATCH: "room-service/batch",
    GET_BY_ID: "room-service/id/",
    CREATE_BATCH: "room-service/batch/create",
    UPDATE: "room-service",
    SOFT_DELETE_BATCH: "room-service/batch/soft-delete",
  },
  ROOM_TYPE: {
    GET_BATCH: "room-type/all",
    GET_SINGLE: "room-type/id/",
    BASE: "room-type",
    SOFT_DELETE: "room-type/id/{id}/soft-delete",
  },
  ROOM: {
    GET_SINGLE: "room/id/",
  },
  BUILDING: {
    CREATE: "building",
    EDIT: "building",
    GET_BATCH: "building/batch",
    GET_SINGLE: "building/id/",
    SOFT_DELETE: "building/id/{id}/soft-delete",
  },
  REGISTRATION: {
    BASE: "registration",
    REGISTER_ACCOMMODATION: "registration",
    GET_INITIAL_DATA: "registration/register-initial-data",
    SEARCH_BUILDING_AND_ROOM: "registration/search-buildings-and-rooms",
  },
  HEALTH_INSURANCE: {
    GET_BATCH: "health-insurance/batch",
  },
  OVERNIGHT_ABSENCE: {
    GET_BATCH: "overnight-absence/batch",
    CREATE: "overnight-absence",
    UPDATE: "overnight-absence",
  },
};
