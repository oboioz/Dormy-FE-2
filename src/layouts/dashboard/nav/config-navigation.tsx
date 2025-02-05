
// components
import Iconify from '../../../components/iconify';
import Label from '../../../components/label';
import SvgColor from '../../../components/svg-color';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // User
  // ----------------------------------------------------------------------
  {
    subheader: 'user',
    items: [
      {
        title: 'residential',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'contract', path: PATH_DASHBOARD.user.profile },
          { title: 'room details', path: PATH_DASHBOARD.user.cards },
        ],
      },
      { title: 'overnight absence', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'my vehicle', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      {
        title: 'invoice',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'rental fee', path: PATH_DASHBOARD.user.profile },
          { title: 'utilities fee', path: PATH_DASHBOARD.user.cards },
          { title: 'others', path: PATH_DASHBOARD.user.cards },
        ],
      },
      { title: 'request', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      { title: 'violation', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
      { title: 'notification', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
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
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
        // caption: 'only_admin_can_see_this_item',
      },

      {
        title: 'system',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'resident',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'resident list', path: PATH_DASHBOARD.user.profile },
          { title: 'workplace', path: PATH_DASHBOARD.user.cards },
        ],
      },

      {
        title: 'dormitory',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'layout structure', path: PATH_DASHBOARD.user.profile },
          { title: 'room type', path: PATH_DASHBOARD.user.cards },
        ],
      },

      {
        title: 'registration',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'overnight request',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'garage',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'vehicle list', path: PATH_DASHBOARD.user.profile },
          { title: 'garage info', path: PATH_DASHBOARD.user.cards },
          { title: 'worker', path: PATH_DASHBOARD.user.cards },
          { title: 'parking request', path: PATH_DASHBOARD.user.cards },
        ],
      },

      {
        title: 'invoice list',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        roles: ['admin'],
        children: [
          { title: 'rent', path: PATH_DASHBOARD.user.profile },
          { title: 'water', path: PATH_DASHBOARD.user.cards },
          { title: 'electricity', path: PATH_DASHBOARD.user.cards },
          { title: 'parking', path: PATH_DASHBOARD.user.cards },
          { title: 'others', path: PATH_DASHBOARD.user.cards },
        ],
      },

      {
        title: 'request list',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
      },

      {
        title: 'notification',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: <Label color="error">+32</Label>,
      },
      {
        title: 'chat',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat,
      },
      {
        title: 'calendar',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
      {
        title: 'kanban',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },

  // DEMO MENU STATES
  {
    subheader: 'Other cases',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'item_by_roles',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
        caption: 'only_admin_can_see_this_item',
      },
      {
        title: 'menu_level',
        path: '#/dashboard/menu_level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'menu_level_2a',
            path: '#/dashboard/menu_level/menu_level_2a',
          },
          {
            title: 'menu_level_2b',
            path: '#/dashboard/menu_level/menu_level_2b',
            children: [
              {
                title: 'menu_level_3a',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
              },
              {
                title: 'menu_level_3b',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
                children: [
                  {
                    title: 'menu_level_4a',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
                  },
                  {
                    title: 'menu_level_4b',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'item_disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },

      {
        title: 'item_label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
            NEW
          </Label>
        ),
      },
      {
        title: 'item_caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'item_external_link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
      },
      {
        title: 'blank',
        path: PATH_DASHBOARD.blank,
        icon: ICONS.blank,
      },
    ],
  },
];

export default navConfig;
