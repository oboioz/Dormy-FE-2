// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
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
import { useEffect, useState } from "react";
import { InvoiceResponseModel } from "../../models/responses/InvoiceResponseModels";
import { GetBatchInvoiceRequestModel } from "../../models/requests/InvoiceRequestModels";
import { toast } from "react-toastify";
import { httpClient } from "../../services";
import { formatCurrency } from "../../utils/currencyUtils";
import InvoiceStatusTag from "../../sections/tag/InvoiceStatusTag";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "invoiceName", label: "Invoice name", align: "left" },
  { id: "dueDate", label: "Due date", align: "left" },
  { id: "amountAfterPromotion", label: "Amount", align: "left" },
  { id: "roomName", label: "Room name", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "center" },
];

// ----------------------------------------------------------------------

export default function UserInvoiceContractListPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState<InvoiceResponseModel[]>([]);

  const {
    page,
    rowsPerPage,
    //
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });

  const fetchInvoicesData = async () => {
    const payload: GetBatchInvoiceRequestModel = {
      ids: [],
      roomId: null,
      invoiceType: "PAYMENT_CONTRACT",
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
        <title>Invoice for contract</title>
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
              href: PATH_USER.invoice.contract,
            },
          ]}
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                />

                <TableBody>
                  {tableData?.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {invoice.invoiceName}
                        </Typography>
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
                    </TableRow>
                  ))}
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
