import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';

// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import { PATH_ADMIN, PATH_USER } from '../../routes/paths';
import NotificationNewPostForm from '../../sections/@dashboard/admin/NotificationNewPostForm';

// ----------------------------------------------------------------------

export default function NotificationNewPostPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Notification | Admin</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new post"
          links={[
            {
              name: 'Dashboard',
              href: PATH_ADMIN.root,
            },
            {
              name: 'Admin',
              href: PATH_ADMIN.profile,
            },
            {
              name: 'Notification',
              href: PATH_USER.notification.notification,
            },
            {
              name: 'Create',
            },
          ]}
        />

        <NotificationNewPostForm />
      </Container>
    </>
  );
}
