// @mui
import {
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
// routes
// components
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import { TableHeadCustom } from "../../components/table";
import { Profile } from "../../models/responses/UserModel";
import Label from "../../components/label";
import Iconify from "../../components/iconify";

const TABLE_HEAD = [
  { id: "fullName", label: "Full Name", align: "left" },
  { id: "gender", label: "Gender", align: "left" },
  { id: "phoneNumber", label: "Phone Number", align: "left" },
  { id: "dateOfBirth", label: "Date of Birth", align: "left" },
  { id: "status", label: "Status", align: "left" },
];

export interface IUsersRoomProps {
  users: Profile[];
}

export default function ContractListPage(props: IUsersRoomProps) {
  if (!props) {
    return null;
  }

  const { users } = props;

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                />

                <TableBody>
                  {users.map((row) => (
                    <TableRow hover key={row.userId}>
                      {/* Full Name */}
                      <TableCell align="left">
                        {row.firstName + " " + row.lastName}
                      </TableCell>

                      {/* Gender */}
                      <TableCell align="left">
                        {row.gender === "MALE" ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:person-outline"
                              color="info.main"
                              width={20}
                              height={20}
                            />
                            <Typography variant="body2">Male</Typography>
                          </Stack>
                        ) : row.gender === "FEMALE" ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:person-female-outline"
                              color="error.main"
                              width={20}
                              height={20}
                            />
                            <Typography variant="body2">Female</Typography>
                          </Stack>
                        ) : (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:people-outline"
                              color="warning.main"
                              width={20}
                              height={20}
                            />
                            <Typography variant="body2">Other</Typography>
                          </Stack>
                        )}
                      </TableCell>

                      {/* Phone Number */}
                      <TableCell align="left">{row.phoneNumber}</TableCell>

                      {/* Date of Birth */}
                      <TableCell align="left">
                        {row.dateOfBirth
                          ? new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }).format(new Date(row.dateOfBirth))
                          : "--/--/--"}
                      </TableCell>

                      {/* Status */}
                      <TableCell align="left">
                        <Label
                          variant="soft"
                          color={
                            row.status === "ACTIVE"
                              ? "success"
                              : row.status === "INACTIVE"
                              ? "error"
                              : "default"
                          }
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
        </Card>
      </Container>
    </>
  );
}
