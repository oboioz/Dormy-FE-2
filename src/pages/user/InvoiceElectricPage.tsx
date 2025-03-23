// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
// utils
import { fDate } from "../../utils/formatTime";
// _mock_
// @types
// components
import { Helmet } from "react-helmet-async";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Label from "../../components/label";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from "../../components/table";
import { PATH_USER } from "../../routes/paths";
import { UserRole } from "../../models/enums/DormyEnums";
import { useAuthGuard } from "../../auth/AuthGuard";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "invoiceID", label: "Invoice ID", align: "left" },
  { id: "createDate", label: "Create", align: "left" },
  { id: "dueDate", label: "Due", align: "left" },
  { id: "price", label: "Amount", align: "center", width: 140 },
  { id: "description", label: "Description", align: "center", width: 140 },
  { id: "status", label: "Status", align: "left" },
];

const mockInvoices = [
  {
    invoiceID: 1,
    createDate: new Date("2024-09-01"),
    dueDate: new Date("2024-09-10"),
    price: 500,
    description: "Monthly rental fee",
    status: "Paid",
  },
  {
    invoiceID: 2,
    createDate: new Date("2024-10-01"),
    dueDate: new Date("2024-10-10"),
    price: 500,
    description: "Monthly rental fee",
    status: "Unpaid",
  },
  {
    invoiceID: 3,
    createDate: new Date("2024-11-01"),
    dueDate: new Date("2024-11-10"),
    price: 500,
    description: "Monthly rental fee",
    status: "Paid",
  },
];

// ----------------------------------------------------------------------

export default function InvoiceElectricPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { themeStretch } = useSettingsContext();

  const {
    page,
    rowsPerPage,
    //
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });

  // const TABS = [
  //   { value: 'rentalFee', label: 'Rental Fee', color: 'info', count: tableData.length },
  //   { value: 'electricFee', label: 'Electric Fee', color: 'success', count: getLengthByStatus('paid') },
  //   { value: 'waterFee', label: 'Water Fee', color: 'warning', count: getLengthByStatus('unpaid') },
  //   { value: 'parkingFee', label: 'Parking Fee', color: 'error', count: getLengthByStatus('overdue') },
  //   { value: 'othersFee', label: 'Others Fee', color: 'default', count: getLengthByStatus('draft') },
  // ] as const;

  return (
    <>
      <Helmet>
        <title> Invoice: List | Electric</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Invoice List"
          links={[
            {
              name: "Dashboard",
              href: PATH_USER.root,
            },
            {
              name: "User",
              href: PATH_USER.profile,
            },
            {
              name: "Invoice",
              href: PATH_USER.invoice,
            },
          ]}
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={mockInvoices.length}
                />

                <TableBody>
                  {mockInvoices.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{row.invoiceID}</TableCell>
                      <TableCell align="left">
                        {fDate(row.createDate)}
                      </TableCell>
                      <TableCell align="left">{fDate(row.dueDate)}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="soft"
                          color={
                            (row.status === "Active" && "success") || "error"
                          }
                          sx={{ textTransform: "capitalize" }}
                        >
                          {row.status}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={mockInvoices.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
