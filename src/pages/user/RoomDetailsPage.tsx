import { CardHeader, Container } from "@mui/material";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "../../components/settings";
import { PATH_USER } from "../../routes/paths";
import RoomDetails from "../../sections/roomdetails/RoomDetails";
import RoomateInformation from "../../sections/roomdetails/RoomateInformation";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { useAuthContext } from "../../auth/JwtContext";
import { httpClient } from "../../services";
import { useEffect, useState } from "react";
import { IRoom } from "../../models/responses/RoomModel";

export default function RoomDetailsPage() {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  useAuthGuard(UserRole.CUSTOMER);

  const [room, setRoom] = useState<IRoom | undefined>(undefined);

  var fetchRoomDetail = async (userId: string) => {
    if (!userId) {
      return;
    }
    var profile = await httpClient.userService.userGetProfile(userId);
    if (profile.contract.roomId) {
      var roomDetail = await httpClient.roomService.getRoomById(
        profile.contract.roomId
      );
      if (roomDetail) {
        setRoom({
          ...roomDetail,
          users: roomDetail.users, //.filter((x) => x.userId !== userId),
        });
      }
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchRoomDetail(user?.id);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>User | Room Details</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Room Details"
          links={[
            { name: "Dashboard", href: PATH_USER.root },
            {
              name: "User",
              href: PATH_USER.profile,
            },
            { name: `Room-${room?.roomNumber}` },
          ]}
        />

        {room && <RoomDetails room={room} />}

        <CardHeader title={"Roomate Information"} sx={{ mb: 3 }} />
        <RoomateInformation users={room?.users || []} />
      </Container>
    </>
  );
}
