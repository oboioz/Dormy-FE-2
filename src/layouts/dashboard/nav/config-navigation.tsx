// components
import SvgColor from "../../../components/svg-color";
import { PATH_ADMIN, PATH_USER } from "../../../routes/paths";
// import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const createIcon = (name: string) => (
  <SvgColor src={name} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: createIcon("mdi:view-dashboard"),
  settings: createIcon("mdi:cog"),
  user: createIcon("mdi:account"),
  resident: createIcon("mdi:home-account"),
  workplace: createIcon("mdi:office-building"),
  dormitory: createIcon("mdi:home-group"),
  roomType: createIcon("mdi:bed"),
  contract: createIcon("mdi:clipboard-list"),
  registration: createIcon("mdi:clipboard-check"),
  overnight: createIcon("mdi:moon-waning-crescent"),
  garage: createIcon("mdi:garage"),
  vehicle: createIcon("mdi:car"),
  worker: createIcon("mdi:account-hard-hat"),
  parking: createIcon("mdi:car-parking-lights"),
  invoice: createIcon("mdi:receipt"),
  rent: createIcon("mdi:home-currency-usd"),
  water: createIcon("mdi:water"),
  electricity: createIcon("mdi:flash"),
  request: createIcon("mdi:clipboard-list"),
  notification: createIcon("mdi:bell"),
  violation: createIcon("mdi:alert-circle"),
};

const userNavConfig = [
  {
    subheader: "user",
    items: [
      {
        title: "Contract",
        path: PATH_USER.contract,
        icon: ICONS.user, // General user-related actions
      },
      {
        title: "Room details",
        path: PATH_USER.roomDetails,
        icon: ICONS.dormitory, // General user-related actions
      },
      {
        title: "overnight absence",
        path: PATH_USER.overnight,
        icon: ICONS.overnight,
      }, // Calendar represents staying overnight
      { title: "my vehicle", path: PATH_USER.vehicle, icon: ICONS.vehicle }, // Cart is the closest to vehicle-related actions
      {
        title: "invoice",
        path: PATH_USER.invoice.monthly,
        icon: ICONS.invoice, // Invoice represents billing
        children: [
          { title: "Monthly invoice", path: PATH_USER.invoice.monthly },
          { title: "Contract invoice", path: PATH_USER.invoice.contract },
        ],
      },
      { title: "request", path: PATH_USER.request, icon: ICONS.request }, // Booking represents requests
      { title: "violation", path: PATH_USER.violation, icon: ICONS.violation },
      {
        title: "notification",
        path: PATH_USER.notification.notification,
        icon: ICONS.notification,
      }, // Label is used for notifications/messages
    ],
  },
];

const adminNavConfig = [
  {
    subheader: "admin",
    items: [
      {
        title: "Dashboard",
        path: PATH_ADMIN.dashboard,
        icon: ICONS.dashboard,
        // roles: ['admin'],
      },
      {
        title: "Registration",
        path: PATH_ADMIN.register,
        icon: ICONS.registration,
        // roles: ['admin'],
      },
      {
        title: "Contract",
        path: PATH_ADMIN.contract.list,
        icon: ICONS.contract,
      },
      {
        title: "Dormitory",
        path: PATH_ADMIN.dormitory.root,
        icon: ICONS.dormitory,
        // roles: ['admin'],

        children: [
          { title: "Building", path: PATH_ADMIN.dormitory.buildings },
          { title: "Room Types", path: PATH_ADMIN.dormitory.roomType },
          { title: "Room Services", path: PATH_ADMIN.dormitory.roomService },
        ],
      },
      {
        title: "Invoice",
        path: PATH_ADMIN.invoice.monthly,
        icon: ICONS.invoice,
        // roles: ['admin'],
        children: [
          { title: "Monthly invoice", path: PATH_ADMIN.invoice.monthly },
          { title: "Contract invoice", path: PATH_ADMIN.invoice.contract },
        ],
      },
      {
        title: "Residential",
        path: PATH_ADMIN.resident,
        icon: ICONS.resident,
        // roles: ['admin'],
      },
      {
        title: "Workplace",
        path: PATH_ADMIN.workplace.list,
        icon: ICONS.workplace,
        // roles: ['admin'],
      },
      {
        title: "Garage",
        path: PATH_ADMIN.garage.parkingSpot,
        icon: ICONS.garage,
        // roles: ['admin'],
        children: [
          { title: "Parking Spot List", path: PATH_ADMIN.garage.parkingSpot },
          { title: "Vehicle List", path: PATH_ADMIN.garage.vehiclelist },
          { title: "Worker List", path: PATH_ADMIN.garage.worker },
          {
            title: "Parking Request",
            path: PATH_ADMIN.garage.registrationlist,
          },
        ],
      },
      {
        title: "Overnight Request",
        path: PATH_ADMIN.overnight,
        icon: ICONS.overnight,
        // roles: ['admin'],
      },

      {
        title: "Violation",
        path: PATH_ADMIN.violation.list,
        icon: ICONS.violation,
        // roles: ['admin'],
      },
      {
        title: "Request",
        path: PATH_ADMIN.request,
        icon: ICONS.request,
        // roles: ['admin'],
      },

      {
        title: "Notification",
        path: PATH_ADMIN.notification.notification,
        icon: ICONS.notification,
        // roles: ['admin'],
      },
      { title: "Settings", path: PATH_ADMIN.settings, icon: ICONS.settings },
    ],
  },
];

export const navConfig = {
  adminNavConfig: adminNavConfig,
  userNavConfig: userNavConfig,
};
