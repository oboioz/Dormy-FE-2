// @mui
import {
  Card,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from "../../components/table";
import { PATH_USER } from "../../routes/paths";
import { Helmet } from "react-helmet-async";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "order", label: "order", align: "left" },
  { id: "description", label: "Description", align: "left" },
];

const MOCK_VIOLATION_DATA = [
  { order: 1, description: "Violation of 11/2024" },
  { order: 2, description: "Violation of 10/2024" },
  { order: 3, description: "Violation of 9/2024" },
  { order: 4, description: "Violation of 8/2024" },
  { order: 5, description: "Violation of 7/2024" },
  { order: 6, description: "Violation of 6/2024" },
  { order: 7, description: "Violation of 5/2024" },
  { order: 8, description: "Violation of 4/2024" },
  { order: 9, description: "Violation of 3/2024" },
];

// ----------------------------------------------------------------------

export default function ViolationMonthListPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { page, onChangePage, rowsPerPage, onChangeRowsPerPage } = useTable();

  const { themeStretch } = useSettingsContext();

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
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  // rowCount={tableData.length}
                />

                <TableBody>
                  {MOCK_VIOLATION_DATA.map((row, index) => (
                    <TableRow key={row.order}>
                      <TableCell align="left">{row.order}</TableCell>
                      <TableCell align="left">
                        <Link>{row.description}</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            page={page}
            onPageChange={onChangePage}
            count={MOCK_VIOLATION_DATA.length}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
