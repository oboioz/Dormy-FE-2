import { Link, useNavigate, useParams } from "react-router-dom";
import { httpClient } from "../../services";
import { useEffect, useState } from "react";
import { IRoom } from "../../models/responses/RoomModel";
import { Helmet } from "react-helmet-async";
import { Button, Container } from "@mui/material";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../components/settings";
import { PATH_ADMIN } from "../../routes/paths";
import Iconify from "../../components/iconify";
import RoomDetail from "./RoomDetail";

export default function RoomPage() {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [room, setRoom] = useState<IRoom>();

  const getRoomDetail = async (id: string) => {
    var response = await httpClient.roomService.getRoomById(id);
    if (response) {
      setRoom(response);
      console.log(response);
    } else {
      navigate(PATH_ADMIN.dormitory.rooms(room?.buildingId || ""));
    }
  };

  useEffect(() => {
    if (roomId) {
      getRoomDetail(roomId);
    }
  }, [roomId]);

  return (
    <>
      <Helmet>
        <title> Room Details</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Dormitory Room Details"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Building", href: PATH_ADMIN.dormitory.buildings },
            { name: "Room" },
            { name: `${room?.roomNumber || ''}`},
          ]}
          action={
            <Button
              component={Link}
              to={PATH_ADMIN.dormitory.blockForm}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Check requests
            </Button>
          }
        />
        <RoomDetail room={room} />
      </Container>
    </>
  );
}
