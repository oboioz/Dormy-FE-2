export const API_URL = {
  BASE_URL: "http://localhost:5158/api/",
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
};
