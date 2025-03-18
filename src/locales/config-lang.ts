// @mui
import { enUS, viVN } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
];

export const defaultLang = allLangs[0]; // English
