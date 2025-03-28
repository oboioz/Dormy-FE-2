import sumBy from "lodash/sumBy";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// utils
import { fTimestamp } from "../../utils/formatTime";
// _mock_
import { _invoices } from "../../_mock/arrays";

// components
import { IInvoice } from "../../@types/invoice";
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Label from "../../components/label";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "../../components/table";
import { PATH_ADMIN } from "../../routes/paths";
import InvoiceAnalytic from "../../sections/@dashboard/admin/invoices/InvoiceAnalytic";
import InvoiceTableRow from "../../sections/@dashboard/admin/invoices/InvoiceTableRow";
import InvoiceTableToolbar from "../../sections/@dashboard/admin/invoices/InvoiceTableToolbar";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// sections

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  "all",
  "rent",
  "water",
  "electricity",
  "parking",
  "others",
];

const TABLE_HEAD = [
  { id: "invoiceID", label: "ID", align: "left" },
  { id: "client", label: "Client", align: "left" },
  { id: "createdAt", label: "Created At", align: "left" },
  { id: "dueDate", label: "Due Date", align: "left" },
  { id: "price", label: "Amount", align: "center", width: 140 },
  { id: "description", label: "Description", align: "center", width: 140 },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
  useAuthGuard(UserRole.ADMIN);
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });

  const [tableData, setTableData] = useState(_invoices);

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState("all");

  const [filterService, setFilterService] = useState("all");

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isFiltered =
    filterStatus !== "all" ||
    filterName !== "" ||
    filterService !== "all" ||
    (!!filterStartDate && !!filterEndDate);

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const getLengthByStatus = (status: string) =>
    tableData.filter((item) => item.status === status).length;

  const getTotalPriceByStatus = (status: string) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      "totalPrice"
    );

  const getPercentByStatus = (status: string) =>
    (getLengthByStatus(status) / tableData.length) * 100;

  const TABS = [
    { value: "all", label: "All", color: "info", count: tableData.length },
    {
      value: "paid",
      label: "Paid",
      color: "success",
      count: getLengthByStatus("paid"),
    },
    {
      value: "unpaid",
      label: "Unpaid",
      color: "warning",
      count: getLengthByStatus("unpaid"),
    },
    {
      value: "overdue",
      label: "Overdue",
      color: "error",
      count: getLengthByStatus("overdue"),
    },
  ] as const;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter(
      (row) => row.invoiceID.toString() !== id
    );
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter(
      (row) => !selectedRows.includes(row.invoiceID.toString())
    );
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id: string) => {
    // navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("all");
    setFilterService("all");
    setFilterEndDate(null);
    setFilterStartDate(null);
  };

  return (
    <>
      <Helmet>
        <title> Invoice: List | Admin</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Invoice List"
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
              name: "Invoice",
            },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_ADMIN.invoice.create}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Invoice
            </Button>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderStyle: "dashed" }}
                />
              }
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Total"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, "totalPrice")}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />

              <InvoiceAnalytic
                title="Paid"
                total={getLengthByStatus("paid")}
                percent={getPercentByStatus("paid")}
                price={getTotalPriceByStatus("paid")}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />

              <InvoiceAnalytic
                title="Unpaid"
                total={getLengthByStatus("unpaid")}
                percent={getPercentByStatus("unpaid")}
                price={getTotalPriceByStatus("unpaid")}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />

              <InvoiceAnalytic
                title="Overdue"
                total={getLengthByStatus("overdue")}
                percent={getPercentByStatus("overdue")}
                price={getTotalPriceByStatus("overdue")}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Divider />

          <InvoiceTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterService={filterService}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            optionsService={SERVICE_OPTIONS}
            onResetFilter={handleResetFilter}
            filterStartDate={filterStartDate}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.invoiceID.toString())
                )
              }
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="ic:round-send" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="eva:printer-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.invoiceID.toString())
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <InvoiceTableRow
                        key={row.invoiceID}
                        row={row}
                        selected={selected.includes(row.invoiceID.toString())}
                        onSelectRow={() =>
                          onSelectRow(row.invoiceID.toString())
                        }
                        onViewRow={() =>
                          handleViewRow(row.invoiceID.toString())
                        }
                        onEditRow={() =>
                          handleEditRow(row.invoiceID.toString())
                        }
                        onDeleteRow={() =>
                          handleDeleteRow(row.invoiceID.toString())
                        }
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
            items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}: {
  inputData: IInvoice[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterService: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (invoice) =>
        // invoice.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        // invoice.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        invoice.invoiceID
          .toString()
          .toLowerCase()
          .indexOf(filterName.toLowerCase()) !== -1 ||
        invoice.roomId.roomID
          .toString()
          .toLowerCase()
          .indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== "all") {
    inputData = inputData.filter((invoice) => invoice.status === filterStatus);
  }

  if (filterService !== "all") {
    // inputData = inputData.filter((invoice) =>
    //   // invoice.invoiceItems.some((c) => c.invoiceId.type === filterService)
    // );
  }

  if (filterStartDate && filterEndDate) {
    inputData = inputData.filter(
      (invoice) =>
        fTimestamp(invoice.createdAt) >= fTimestamp(filterStartDate) &&
        fTimestamp(invoice.createdAt) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}
