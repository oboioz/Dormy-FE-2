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
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
} from "../../components/table";
import { Profile } from "../../models/responses/UserModel";
import Label from "../../components/label";
import Iconify from "../../components/iconify";
import UserStatusTag from "../tag/UserStatusTag";
import { fDate } from "../../utils/formatTime";

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

export default function RoomateInformation(props: IUsersRoomProps) {
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
                          ? fDate(row.dateOfBirth, "dd/MM/yyyy")
                          : "--/--/--"}
                      </TableCell>

                      {/* Status */}
                      <TableCell align="left">
                        <UserStatusTag status={row.status} />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableNoData isNotFound={users.length <= 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
