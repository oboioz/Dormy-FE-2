// @mui
import {
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
// routes
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
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "../../components/table";
import { PATH_USER } from "../../routes/paths";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { useEffect, useState } from "react";
import { InvoiceResponseModel } from "../../models/responses/InvoiceResponseModels";
import { GetBatchInvoiceRequestModel } from "../../models/requests/InvoiceRequestModels";
import { toast } from "react-toastify";
import { httpClient } from "../../services";
import { formatCurrency } from "../../utils/currencyUtils";
import InvoiceStatusTag from "../../sections/tag/InvoiceStatusTag";
import UserViewDetailInvoiceModal from "../../sections/@dashboard/user/invoice/UserViewDetailInvoiceModal";
import Iconify from "../../components/iconify";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "invoiceName", label: "Invoice name", align: "left" },
  { id: "month_year", label: "Month/Year", align: "left" },
  { id: "dueDate", label: "Due date", align: "left" },
  { id: "amountAfterPromotion", label: "Amount", align: "left" },
  { id: "roomName", label: "Room name", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "center" },
];

// ----------------------------------------------------------------------

export default function UserInvoiceMonthlyListPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { themeStretch } = useSettingsContext();

  const {
    page,
    rowsPerPage,
    //
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });

  const [tableData, setTableData] = useState<InvoiceResponseModel[]>([]);
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const handleOpenViewDetail = () => {
    setOpenViewDetail(true);
  };
  const handleCloseViewDetail = () => {
    setOpenViewDetail(false);
  };

  const fetchInvoicesData = async () => {
    const payload: GetBatchInvoiceRequestModel = {
      ids: [],
      roomId: null,
      invoiceType: "ROOM_SERVICE_MONTHLY",
    };
    const response = await httpClient.invoiceService.getBatchInvoices(payload);

    if (response) {
      console.log("response", response);
      setTableData(response);
    } else {
      setTableData([]);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchInvoicesData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Invoice</title>
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
              href: PATH_USER.invoice.monthly,
            },
          ]}
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                />

                <TableBody>
                  {tableData.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {invoice.invoiceName}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        {invoice.month + "/" + invoice.year}
                      </TableCell>
                      <TableCell>
                        {fDate(invoice.dueDate, "dd/MM/yyyy")}
                      </TableCell>

                      <TableCell align="left">
                        {formatCurrency(invoice.amountAfterPromotion)}
                      </TableCell>
                      <TableCell align="center">{invoice.roomName}</TableCell>

                      <TableCell align="left">
                        <InvoiceStatusTag status={invoice.status} />
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            handleOpenViewDetail();
                          }}
                        >
                          <Iconify icon="eva:eye-outline" />
                        </IconButton>
                      </TableCell>
                      <UserViewDetailInvoiceModal
                        open={openViewDetail}
                        onClose={() => setOpenViewDetail(false)}
                        invoiceId={invoice.id}
                      />
                    </TableRow>
                  ))}
                  <TableNoData isNotFound={tableData?.length == 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.length}
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
