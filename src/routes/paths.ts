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
  // blank: path(ROOTS_DASHBOARD, '/blank'),
  // general: {
  //   app: path(ROOTS_DASHBOARD, '/app'),
  //   ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  //   analytics: path(ROOTS_DASHBOARD, '/analytics'),
  //   banking: path(ROOTS_DASHBOARD, '/banking'),
  //   booking: path(ROOTS_DASHBOARD, '/booking'),
  //   file: path(ROOTS_DASHBOARD, '/file'),
  // },
  root: path(ROOTS_USER, "/profile"),
  profile: path(ROOTS_USER, "/profile"),

  residential: {
    root: path(ROOTS_USER, "/contract"),
    contract: path(ROOTS_USER, "/contract"),
    roomDetails: path(ROOTS_USER, "/roomdetails"),
  },

  overnight: path(ROOTS_USER, "/overnight"),
  overnightRequest: path(ROOTS_USER, "/newovernight"),

  vehicle: path(ROOTS_USER, "/vehicle"),
  vehicleRegister: path(ROOTS_USER, "/newvehicle"),

  invoice: {
    root: path(ROOTS_USER, "/invoicerent"),
    rent: path(ROOTS_USER, "/invoicerent"),
    water: path(ROOTS_USER, "/invoicewater"),
    electric: path(ROOTS_USER, "/invoiceelectric"),
    parking: path(ROOTS_USER, "/invoiceparking"),
    others: path(ROOTS_USER, "/invoiceothers"),
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

  invoice: {
    list: path(ROOTS_ADMIN, "/invoice"),
    create: path(ROOTS_ADMIN, "/invoicecreate"),
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
    list: path(ROOTS_ADMIN, "/garage"),
    form: path(ROOTS_ADMIN, "/garageform"),
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

// export const PATH_DASHBOARD = {
//   root: ROOTS_DASHBOARD,
//   kanban: path(ROOTS_DASHBOARD, '/kanban'),
//   calendar: path(ROOTS_DASHBOARD, '/calendar'),
//   fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
//   permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
//   blank: path(ROOTS_DASHBOARD, '/blank'),
//   general: {
//     app: path(ROOTS_DASHBOARD, '/app'),
//     ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
//     analytics: path(ROOTS_DASHBOARD, '/analytics'),
//     banking: path(ROOTS_DASHBOARD, '/banking'),
//     booking: path(ROOTS_DASHBOARD, '/booking'),
//     file: path(ROOTS_DASHBOARD, '/file'),
//   },
//   mail: {
//     root: path(ROOTS_DASHBOARD, '/mail'),
//     all: path(ROOTS_DASHBOARD, '/mail/all'),
//   },
//   chat: {
//     root: path(ROOTS_DASHBOARD, '/chat'),
//     new: path(ROOTS_DASHBOARD, '/chat/new'),
//     view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
//   },
//   user: {
//     root: path(ROOTS_DASHBOARD, '/user'),
//     new: path(ROOTS_DASHBOARD, '/user/new'),
//     list: path(ROOTS_DASHBOARD, '/user/list'),
//     cards: path(ROOTS_DASHBOARD, '/user/cards'),
//     profile: path(ROOTS_DASHBOARD, '/user/profile'),
//     account: path(ROOTS_DASHBOARD, '/user/account'),
//     edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
//     demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
//   },
//   eCommerce: {
//     root: path(ROOTS_DASHBOARD, '/e-commerce'),
//     shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
//     list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
//     checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
//     new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
//     view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
//     edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
//     demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
//     demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
//   },
//   invoice: {
//     root: path(ROOTS_DASHBOARD, '/invoice'),
//     list: path(ROOTS_DASHBOARD, '/invoice/list'),
//     new: path(ROOTS_DASHBOARD, '/invoice/new'),
//     view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
//     edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
//     demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
//     demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
//   },
//   blog: {
//     root: path(ROOTS_DASHBOARD, '/blog'),
//     posts: path(ROOTS_DASHBOARD, '/blog/posts'),
//     new: path(ROOTS_DASHBOARD, '/blog/new'),
//     view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
//     demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
//   },
// };
