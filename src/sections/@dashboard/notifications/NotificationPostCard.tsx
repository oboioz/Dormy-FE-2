import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { fDate } from "../../../utils/formatTime";
import Image from "../../../components/image";
import TextMaxLine from "../../../components/text-max-line";
import { PATH_ADMIN, PATH_USER } from "../../../routes/paths";
import { INotification } from "../../../models/responses/NotificationModels";
import Iconify from "../../../components/iconify";
import { NotificationTypeEnum } from "../../../models/enums/NotificationTypeEnum";
import { Button } from "@mui/material";
import { useAuthContext } from "../../../auth/JwtContext";
import { UserRole } from "../../../models/enums/DormyEnums";

type Props = {
  notification: INotification;
  readNotification?: (id: string) => {};
};

export default function NotificationPostCard({
  notification,
  readNotification,
}: Props) {
  const { user } = useAuthContext();
  const isAdmin = user.role === UserRole.ADMIN;

  const {
    id,
    title,
    date,
    content,
    description,
    userFullName,
    email,
    phoneNumber,
    gender,
    notificationType,
  } = notification;

  const cover =
    "https://thanhtay.edu.vn/wp-content/uploads/2023/02/cau-truc-request-1.jpeg";

  const mapRequestURL = (notificationType: string) => {
    switch (notificationType) {
      case NotificationTypeEnum.REGISTRATION_CREATION.toString(): {
        return PATH_ADMIN.register;
      }
      case NotificationTypeEnum.CONTRACT_ACTIVATION.toString(): {
        return PATH_USER.roomDetails;
      }
      case NotificationTypeEnum.REQUEST_CREATION.toString(): {
        return PATH_ADMIN.request;
      }
      case NotificationTypeEnum.REQUEST_STATUS_CHANGE.toString(): {
        return isAdmin ? PATH_ADMIN.request : PATH_USER.request;
      }
      case NotificationTypeEnum.PARKING_REQUEST_CREATION.toString(): {
        return PATH_ADMIN.garage.registrationlist;
      }
      case NotificationTypeEnum.PARKING_REQUEST_STATUS_CHANGE.toString(): {
        return isAdmin ? PATH_ADMIN.garage.registrationlist : PATH_USER.vehicle;
      }
      case NotificationTypeEnum.VIOLATION_CREATION.toString(): {
        return PATH_USER.violation;
      }
      default:
        return "#";
    }
  };

  const actionURL = mapRequestURL(notificationType);

  return (
    <Card>
      <Box sx={{ position: "relative" }}>
        <Image alt="cover" src={cover} ratio="4/3" />
      </Box>

      <CardContent
        sx={{
          pt: 4.5,
          width: 1,
        }}
      >
        {/* Notification Title */}
        <Typography
          gutterBottom
          variant="caption"
          component="div"
          sx={{
            color: "text.disabled",
          }}
        >
          {fDate(date)}
        </Typography>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          component={RouterLink}
          to={actionURL}
        >
          <TextMaxLine variant={"subtitle2"} line={2} persistent>
            {title}
          </TextMaxLine>
        </Link>

        {/* User Details */}
        <Stack spacing={1} sx={{ mt: 3 }}>
          {isAdmin && (
            <>
              <Typography variant="body2">
                <b>Full Name:</b> {userFullName}
              </Typography>
              <Typography variant="body2">
                <b>Email:</b> {email}
              </Typography>
              <Typography variant="body2">
                <b>Phone Number:</b> {phoneNumber}
              </Typography>
            </>
          )}
          <Typography variant="body2">
            <b>Description:</b> {content}
          </Typography>
          {isAdmin && (
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <b>Gender:</b>{" "}
              <Iconify
                icon={gender === "MALE" ? "mdi:human-male" : "mdi:human-female"}
                sx={{
                  ml: 1,
                  color: gender === "MALE" ? "blue" : "pink",
                }}
              />
            </Typography>
          )}
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => readNotification && readNotification(id)}
        >
          Mark as Read
        </Button>
      </CardContent>
    </Card>
  );
}
