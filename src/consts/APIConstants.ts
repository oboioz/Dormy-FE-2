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
  REQUEST: {
    GET_BATCH: "request/batch",
    GET_SINGLE: "request/id/",
    UPDATE: "request/id/",
    APPROVE_REJECT: "request/id/{id}/approve-or-reject",
    CANCEL: "request/id/{id}/cancel",
  },
  CONTRACT: {
    GET_BATCH: "contract/batch",
    GET_SINGLE: "contract/id/",
    CREATE: "contract",
    UPDATE: "contract",
    ACCEPT_OR_REJECT: "contract/id/{{id}}/approve-or-reject",
    ACTIVE: "contract/id/{id}/active",
    TERMINATE: "contract/id/{id}/terminate",
    EXPIRED: "contract/id/{id}/expired",
  },
  PARKING_REQUEST: {
    GET_BATCH: "parking-request/batch",
    APPROVE_REJECT: "parking-request/id/{id}/approve-or-reject",
    CANCEL: "parking-request/id/{id}/cancel",
    SOFT_DELETE: "parking-request/id/{id}/soft-delete",
    GET_SINGLE: "parking-request/id/",
  },
};
