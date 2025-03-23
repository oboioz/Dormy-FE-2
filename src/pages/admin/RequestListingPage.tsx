import { useNavigate } from "react-router-dom";
// @mui
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";

// components
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { _mockRequests } from "../../_mock/assets/request";
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable,
} from "../../components/table";
import { PATH_ADMIN } from "../../routes/paths";
import RequestRow from "../../sections/@dashboard/admin/request/RequestRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "type", label: "Type", align: "left" },
  { id: "submitTime", label: "Submit Time", align: "left" },
  { id: "requester", label: "Requester", align: "left" },
  { id: "phoneNumber", label: "Phone Number", align: "left" },
  { id: "room", label: "Room", align: "center" },
  { id: "reason", label: "Reason", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "" },
];

// const _mockData = _requests;
const _mockData = _mockRequests;

// ----------------------------------------------------------------------

export default function RequestListingPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
  } = useTable();

  const dataInPage = _mockData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(_mockData);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !_mockData.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter(
      (row) => row.requestID.toString() !== id
    );
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Request List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Contract List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "User", href: PATH_ADMIN.profile },
            { name: "Request List" },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.user.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //   >
          //     Add new contract
          //   </Button>
          // }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.requestID.toString())
                    )
                  }

                  // rowCount={tableData.length}
                />

                <TableBody>
                  {_mockData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RequestRow
                        key={row.requestID}
                        row={row}
                        selected={selected.includes(row.requestID.toString())}
                        onSelectRow={() =>
                          onSelectRow(row.requestID.toString())
                        }
                        onEditRow={() =>
                          handleEditRow(row.requestID.toString())
                        }
                        onDeleteRow={() =>
                          handleDeleteRow(row.requestID.toString())
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
              // handleDeleteRows(selected);
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
