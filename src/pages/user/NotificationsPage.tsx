import { Container, Grid } from "@mui/material";
import { PATH_USER } from "../../routes/paths";
import { Helmet } from "react-helmet-async";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../components/settings";
import { SkeletonPostItem } from "../../components/skeleton";
import NotificationPostCard from "../../sections/@dashboard/notifications/NotificationPostCard";
import { useEffect, useState } from "react";
import { INotification } from "../../models/responses/NotificationModels";
import { httpClient } from "../../services";
import { useAuthContext } from "../../auth/JwtContext";
import { UserRole } from "../../models/enums/DormyEnums";
import { NotificationTypeEnum } from "../../models/enums/NotificationTypeEnum";
import { toast } from "react-toastify";
import { useAuthGuard } from "../../auth/AuthGuard";

export default function NotificationsPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();

  const [notifications, setNotifications] = useState<INotification[]>();

  const fetchNotifications = async () => {
    var notifications = await httpClient.notificationService.getNotifications();
    // if (!isAdmin) {
    //   notifications = notifications.filter((x) =>
    //     [
    //       NotificationTypeEnum.CONTRACT_ACTIVATION.toString(),
    //       NotificationTypeEnum.VIOLATION_CREATION.toString(),
    //       NotificationTypeEnum.REQUEST_STATUS_CHANGE.toString(),
    //       NotificationTypeEnum.PARKING_REQUEST_STATUS_CHANGE.toString(),
    //     ].includes(x.notificationType)
    //   );
    // }
    setNotifications(notifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const readNotification = async (id: string) => {
    var response = await httpClient.notificationService.readNotifications(id);
    if (response) {
      toast.success("Read");
      fetchNotifications();
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  return (
    <>
      <Helmet>
        <title> Notification | Dormy</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Notification"
          links={[
            {
              name: "Dashboard",
              href: PATH_USER.root,
            },
            {
              name: "User",
              href: PATH_USER.profile,
            },
            {
              name: "Notification",
            },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.blog.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //   >
          //     New Post
          //   </Button>
          // }
        />

        <Grid container spacing={3}>
          {notifications?.map((notification, index) =>
            notification ? (
              <Grid key={notification.id} item xs={12} sm={6} md={4}>
                <NotificationPostCard
                  notification={notification}
                  readNotification={() => readNotification(notification.id)}
                />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </>
  );
}
