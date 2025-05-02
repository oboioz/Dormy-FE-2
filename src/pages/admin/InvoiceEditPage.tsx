import { Helmet } from "react-helmet-async";
// @mui
import { Container } from "@mui/material";
// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../components/settings";
// sections

import { PATH_ADMIN } from "../../routes/paths";
import InvoiceNewEditForm from "../../sections/@dashboard/admin/invoices/form";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { useParams } from "react-router-dom";

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {
  useAuthGuard(UserRole.ADMIN);
  const { themeStretch } = useSettingsContext();
  const { invoiceId } = useParams();

  return (
    <>
      <Helmet>
        <title> Invoices: Edit invoice | Dormy</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Edit invoice"
          links={[
            {
              name: "Dashboard",
              href: PATH_ADMIN.root,
            },
            {
              name: "Admin",
              href: PATH_ADMIN.profile,
            },
            {
              name: "Invoices",
              href: PATH_ADMIN.invoice.monthly,
            },
            {
              name: "Edit invoice",
            },
          ]}
        />

        <InvoiceNewEditForm isEdit={true} invoiceId={invoiceId}/>
      </Container>
    </>
  );
}
