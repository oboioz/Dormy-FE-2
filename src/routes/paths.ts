// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_USER = "/user";
const ROOTS_ADMIN = "/admin";
const ROOTS_REGISTER = "/registration";
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PATH_USER = {
  root: path(ROOTS_USER, "/profile"),
  profile: path(ROOTS_USER, "/profile"),

  contract: path(ROOTS_USER, "/contract"),
  createContract: path(ROOTS_USER, "/contractcreate"),
  extendContract: path(ROOTS_USER, "/contractextend"),
  roomDetails: path(ROOTS_USER, "/roomdetails"),

  overnight: path(ROOTS_USER, "/overnight"),
  overnightRequest: path(ROOTS_USER, "/newovernight"),

  vehicle: path(ROOTS_USER, "/vehicle"),
  vehicleRegister: path(ROOTS_USER, "/newvehicle"),

  invoice: {
    monthly: path(ROOTS_USER, "/invoice/room-service-monthly"),
    contract: path(ROOTS_USER, "/invoice/contract"),
  },

  request: path(ROOTS_USER, "/request"),
  requestNew: path(ROOTS_USER, "/newrequest"),

  notification: {
    notification: path(ROOTS_USER, "/notification"),
    view: (title: string) => path(ROOTS_USER, `/notification/post/${title}`),
  },

  violation: path(ROOTS_USER, "/violation"),
  violationDetails: path(ROOTS_USER, "/violationdetails"),
};

export const PATH_ADMIN = {
  root: path(ROOTS_ADMIN, "/dashboard"),
  dashboard: path(ROOTS_ADMIN, "/dashboard"),
  profile: path(ROOTS_ADMIN, "/profile"),

  resident: path(ROOTS_ADMIN, "/resident"),

  settings: path(ROOTS_ADMIN, "/settings"),

  overnight: path(ROOTS_ADMIN, "/overnight"),
  request: path(ROOTS_ADMIN, "/request"),
  register: path(ROOTS_ADMIN, "/registration"),
  contract: {
    list: path(ROOTS_ADMIN, "/contractlist"),
    detail: (contractId: string) => path(ROOTS_ADMIN, `/contract/${contractId}`),
  },

  invoice: {
    monthly: path(ROOTS_ADMIN, "/invoice/room-service-monthly"),
    contract: path(ROOTS_ADMIN, "/invoice/contract"),
    create: path(ROOTS_ADMIN, "/invoicecreate"),
    edit: (invoiceId: string) => path(ROOTS_ADMIN, `/invoice-edit/${invoiceId}`),
  },

  notification: {
    notification: path(ROOTS_ADMIN, "/notification"),
    post: path(ROOTS_ADMIN, "/notificationpost"),
    // view: (title: string) => path(ROOTS_USER, `/notification/post/${title}`),
    create: path(ROOTS_ADMIN, "/notificationcreate"),
  },

  workplace: {
    list: path(ROOTS_ADMIN, "/workplacelist"),
    form: path(ROOTS_ADMIN, "/workplaceform"),
  },

  violation: {
    list: path(ROOTS_ADMIN, "/violation"),
    form: path(ROOTS_ADMIN, "/violationform"),
  },

  garage: {
    parkingSpot: path(ROOTS_ADMIN, "/parkingspot"),
    parkingSpotForm: path(ROOTS_ADMIN, "/parkingspotform"),
    vehiclelist: path(ROOTS_ADMIN, "/vehiclelist"),
    registrationlist: path(ROOTS_ADMIN, "/vehicleregisterlist"),
    worker: path(ROOTS_ADMIN, "/garageworker"),
  },

  dormitory: {
    root: path(ROOTS_ADMIN, "/buildings"),
    buildings: path(ROOTS_ADMIN, "/buildings"),
    buildingForm: path(ROOTS_ADMIN, "/buildingeditor"),
    // view: (name: string) => path(ROOTS_ADMIN, `/structure/building/${name}`),
    rooms: (buildingId: string) =>
      path(ROOTS_ADMIN, `/buildings/${buildingId}/rooms`),
    roomDetail: (roomId: string) => path(ROOTS_ADMIN, `/rooms/${roomId}`),
    roomCreate: path(ROOTS_ADMIN, "/structure/structurename/roomcreate"),

    roomType: path(ROOTS_ADMIN, "/roomtype"),
    roomTypeForm: path(ROOTS_ADMIN, "/roomtypeedit"),

    roomService: path(ROOTS_ADMIN, "/roomservice"),
    roomServiceForm: path(ROOTS_ADMIN, "/roomserviceedit"),
    // edit: (name: string) => path(ROOTS_ADMIN, `/user/${name}/edit`),
  },
};

export const PATH_REGISTER = {
  policy: path(ROOTS_REGISTER, "/policy"),
  email: path(ROOTS_REGISTER, "/email"),
  bed: path(ROOTS_REGISTER, "/bed"),
  form: path(ROOTS_REGISTER, "/form"),
  preview: path(ROOTS_REGISTER, "/preview"),
  success: path(ROOTS_REGISTER, "/success"),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
};