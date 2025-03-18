import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections

import { PATH_ADMIN } from '../../routes/paths';
import InvoiceNewEditForm from '../../sections/@dashboard/admin/invoices/form';

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Invoices: Create a new invoice | Dormy</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new invoice"
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
              name: 'Invoices',
              href: PATH_ADMIN.invoice.list,
            },
            {
              name: 'New invoice',
            },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </>
  );
}
