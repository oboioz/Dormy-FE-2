// components
import SvgColor from '../../../components/svg-color';
import { PATH_USER } from '../../../routes/paths';
// import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const createIcon = (name: string) => <SvgColor src={name} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: createIcon("mdi:account"),
  file: createIcon("mdi:file-document"),
  folder: createIcon("mdi:folder"),
  calendar: createIcon("mdi:calendar"),
  vehicle: createIcon("mdi:motorbike"), // Vehicle (Motorbike icon)
  invoice: createIcon("mdi:receipt"),
  banking: createIcon("mdi:bank"),
  booking: createIcon("mdi:clipboard-check"),
  lock: createIcon("mdi:lock"),
  notification: createIcon("mdi:bell"),
};

const navConfig = [
  // User
  // ----------------------------------------------------------------------
  {
    subheader: 'user',
    items: [
      {
        title: 'residential',
        path: PATH_USER.residential.root,
        icon: ICONS.user, // General user-related actions
        children: [
          { title: 'contract', path: PATH_USER.residential.contract }, // File represents contracts/documents
          { title: 'room details', path: PATH_USER.residential.roomDetails }, // Folder for room-related data
        ],
      },
      { title: 'overnight absence', path: PATH_USER.overnight, icon: ICONS.calendar }, // Calendar represents staying overnight
      { title: 'my vehicle', path: PATH_USER.vehicle, icon: ICONS.vehicle }, // Cart is the closest to vehicle-related actions
      {
        title: 'invoice',
        path: PATH_USER.invoice.root,
        icon: ICONS.invoice, // Invoice represents billing
        children: [
          { title: 'rental fee', path: PATH_USER.invoice.rent },
          { title: 'water fee', path: PATH_USER.invoice.water }, // Banking is relevant for utilities
          { title: 'electric fee', path: PATH_USER.invoice.electric }, // Banking is relevant for utilities
          { title: 'parking fee', path: PATH_USER.invoice.parking }, // Banking is relevant for utilities
          { title: 'others', path: PATH_USER.invoice.others }, // Miscellaneous financial matters
        ],
      },
      { title: 'request', path: PATH_USER.request, icon: ICONS.booking }, // Booking represents requests
      { title: 'violation', path: PATH_USER.violation, icon: ICONS.lock },
      { title: 'notification', path: PATH_USER.notification.notification, icon: ICONS.notification }, // Label is used for notifications/messages
    ],
  },

  // Admin
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'dashboard',
        path: PATH_USER.profile,
        icon: ICONS.lock,
        roles: ['admin'],
        // caption: 'only_admin_can_see_this_item',
      },

      {
        title: 'system',
        path: PATH_USER.profile,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'resident',
        path: PATH_USER.profile,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'resident list', path: PATH_USER.profile },
          { title: 'workplace', path: PATH_USER.profile },
        ],
      },

      {
        title: 'dormitory',
        path: PATH_USER.profile,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'layout structure', path: PATH_USER.profile },
          { title: 'room type', path: PATH_USER.profile },
        ],
      },

      {
        title: 'registration',
        path: PATH_USER.profile,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'overnight request',
        path: PATH_USER.profile,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'garage',
        path: PATH_USER.profile,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'vehicle list', path: PATH_USER.profile },
          { title: 'garage info', path: PATH_USER.profile },
          { title: 'worker', path: PATH_USER.profile },
          { title: 'parking request', path: PATH_USER.profile },
        ],
      },

      {
        title: 'invoice list',
        path: PATH_USER.profile,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'rent', path: PATH_USER.profile },
          { title: 'water', path: PATH_USER.profile },
          { title: 'electricity', path: PATH_USER.profile },
          { title: 'parking', path: PATH_USER.profile },
          { title: 'others', path: PATH_USER.profile },
        ],
      },

      {
        title: 'request list',
        path: PATH_USER.profile,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'notification',
        path: PATH_USER.profile,
        icon: ICONS.lock,
        roles: ['admin'],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_USER.profile,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     {
  //       title: 'chat',
  //       path: PATH_USER.profile,
  //       icon: ICONS.chat,
  //     },
  //     {
  //       title: 'calendar',
  //       path: PATH_USER.profile,
  //       icon: ICONS.calendar,
  //     },
  //     {
  //       title: 'kanban',
  //       path: PATH_USER.profile,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },

  // // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_USER.profile,
  //       icon: ICONS.lock,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level',
  //       path: '#/dashboard/menu_level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'menu_level_2a',
  //           path: '#/dashboard/menu_level/menu_level_2a',
  //         },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/dashboard/menu_level/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'item_disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },

  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'item_external_link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //     },
  //     {
  //       title: 'blank',
  //       path: PATH_USER.profile,
  //       icon: ICONS.blank,
  //     },
  //   ],
  // },
];

export default navConfig;
