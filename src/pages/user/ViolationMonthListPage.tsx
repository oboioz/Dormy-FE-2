// @mui
import {
  Card,
  Container,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "../../components/table";
import { PATH_USER } from "../../routes/paths";
import { Helmet } from "react-helmet-async";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { useEffect, useState } from "react";
import { IViolation } from "../../models/responses/ViolationModels";
import { httpClient } from "../../services";
import ViolationTableRow from "../../sections/@dashboard/user/violation/ViolationTableRow";

const TABLE_HEAD = [
  {
    id: "violationDate",
    label: "Violation Date",
    align: "left",
    sortable: true,
  },
  { id: "description", label: "Description", align: "left" },
  { id: "penalty", label: "Penalty", align: "left", sortable: true },
];

export default function ViolationMonthListPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const {
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    setOrder,
    setOrderBy,
    setPage,
    setRowsPerPage,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onChangeRowsPerPage,
    onChangePage,
  } = useTable({
    defaultRowsPerPage: 10,
    defaultOrderBy: "violationDate",
    defaultOrder: "desc",
  });

  const { themeStretch } = useSettingsContext();

  const [violations, setViolations] = useState<IViolation[]>([]);
  const isNotFound = !violations.length;

  const fetchViolations = async () => {
    var response = await httpClient.violationService.getViolationBatch({
      ids: [],
    });

    // Sort based on order and orderBy
    response.sort((a, b) => {
      if (orderBy === "violationDate") {
        return order === "asc"
          ? new Date(a.violationDate).getTime() -
              new Date(b.violationDate).getTime()
          : new Date(b.violationDate).getTime() -
              new Date(a.violationDate).getTime();
      }
      if (orderBy === "penalty") {
        return order === "asc" ? a.penalty - b.penalty : b.penalty - a.penalty;
      }
      return 0;
    });

    setViolations(response);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSort = (id: string) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);

    // Sort the violations based on the new order and orderBy
    const sortedViolations = [...violations].sort((a, b) => {
      if (id === "violationDate") {
        return isAsc
          ? new Date(a.violationDate).getTime() -
              new Date(b.violationDate).getTime()
          : new Date(b.violationDate).getTime() -
              new Date(a.violationDate).getTime();
      }
      if (id === "penalty") {
        return isAsc ? a.penalty - b.penalty : b.penalty - a.penalty;
      }
      return 0;
    });

    setViolations(sortedViolations);
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  return (
    <>
      <Helmet>
        <title>Violation List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Violation List"
          links={[
            { name: "Dashboard", href: PATH_USER.root },
            { name: "User", href: PATH_USER.profile },
            { name: "Violation" },
          ]}
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={violations.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  violations.map((row) => row.id.toString())
                )
              }
            />

            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={violations.length}
                  numSelected={selected.length}
                  onSort={onSort} // Pass the onSort function
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      violations.map((row) => row.id.toString())
                    )
                  }
                />

                <TableBody>
                  {violations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ViolationTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(page, rowsPerPage, violations.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={violations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
