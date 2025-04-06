import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from "@mui/material";

// components
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import _mock from "../../_mock";
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  useTable,
} from "../../components/table";
import { PATH_ADMIN } from "../../routes/paths";
import WorkplaceTableRow from "../../sections/@dashboard/admin/resident/WorkplaceTableRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { WorkplaceModel } from "../../models/responses/WorkplaceModels";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Workplace Name", align: "left" },
  { id: "address", label: "Address", align: "left" },
  { id: "abbrevation", label: "Abbreviation", align: "left" },
  { id: "createdByCreator", label: "Abbreviation", align: "left" },
  { id: "createdDateUtc", label: "Created At", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function WorkplaceListPage() {
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

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [_workplaceList, setWorkplaces] = useState<WorkplaceModel[]>([]);

  const dataInPage = _workplaceList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !_workplaceList.length && !!filterName;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_ADMIN.workplace.form + `?id=${id}`);
  };

  const handleDeleteRow = async (id: string) => {
    var response = await httpClient.workplaceService.softDeleteWorkplace(id);
    if (response) {
      toast.success("Delete successfully!");
      window.location.reload();
    } else {
      toast.error("Delete failed!");
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = _workplaceList.filter(
      (row) => !selectedRows.includes(row.id.toString())
    );
    setSelected([]);
    setWorkplaces(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === _workplaceList.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil(
            (_workplaceList.length - selectedRows.length) / rowsPerPage
          ) - 1;
        setPage(newPage);
      }
    }
  };

  const fetchWorkplaces = async () => {
    var response = await httpClient.workplaceService.getAllWorkplace();
    if (response?.length > 0) {
      setWorkplaces(response);
    }
  };

  useEffect(() => {
    fetchWorkplaces();
  }, []);

  return (
    <>
      <Helmet>
        <title>Workplace List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Workplace List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "User", href: PATH_ADMIN.profile },
            { name: "Workplace List" },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_ADMIN.workplace.form}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new workplace
            </Button>
          }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={_workplaceList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  _workplaceList.map((row) => row.id.toString())
                )
              }
              // action={
              //   <Tooltip title="Delete">
              //     <IconButton color="primary" onClick={handleOpenConfirm}>
              //       <Iconify icon="eva:trash-2-outline" />
              //     </IconButton>
              //   </Tooltip>
              // }
            />

            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={_workplaceList.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      _workplaceList.map((row) => row.id.toString())
                    )
                  }
                />

                <TableBody>
                  {_workplaceList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <WorkplaceTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onEditRow={() => handleEditRow(row.id.toString())}
                        onDeleteRow={() => handleDeleteRow(row.id.toString())}
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(
                      page,
                      rowsPerPage,
                      _workplaceList.length
                    )}
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
