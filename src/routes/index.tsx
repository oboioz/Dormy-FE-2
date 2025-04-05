import { useRoutes } from "react-router-dom";
import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
import SimpleLayout from "../layouts/simple";

import {
  AdminDashboardPage,
  AdminProfilePage,
  ContractListPage,
  DormitoryBuildingFormPage,
  DormitoryBuildingPage,
  DormitoryRoomCreatePage,
  DormitoryRoomListPage,
  EnterEmailPage,
  InvoiceCreatePage,
  InvoiceElectricPage,
  InvoiceListPage,
  InvoiceOthersPage,
  InvoiceParkingPage,
  InvoiceRentPage,
  InvoiceWaterPage,
  LoginPage,
  MyVehiclePage,
  NewPasswordPage,
  NotificationNewPostPage,
  NotificationPostPage,
  NotificationsPage,
  OvernightAbsencePage,
  OvernightRequestFormPage,
  OvernightRequestPage,
  RegistrationFormPage,
  RegistrationListPage,
  RegistrationPolicyPage,
  RegistrationPreviewPage,
  RegistrationSuccessPage,
  RequestFormPage,
  RequestListingPage,
  RequestListPage,
  ResetPasswordPage,
  ResidentListPage,
  RoomDetailsPage,
  RoomPickingPage,
  RoomTypeFormPage,
  RoomTypePage,
  RoomServicePage,
  RoomServiceFormPage,
  SystemSettingsPage,
  UserProfilePage,
  VehicleGarageCreatePage,
  VehicleGaragePage,
  VehicleListPage,
  VehicleRegistrationFormPage,
  VehicleRegistrationListPage,
  VehicleWorkerPage,
  VerifyCodePage,
  ViolationDetailsListPage,
  ViolationDetailsPage,
  ViolationFormPage,
  ViolationMonthListPage,
  WorkplaceFormPage,
  WorkplaceListPage,
  RoomPage,
} from "./elements";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          element: <CompactLayout />,
          children: [
            { path: "reset-password", element: <ResetPasswordPage /> },
            { path: "new-password", element: <NewPasswordPage /> },
            { path: "verify", element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    {
      path: "user",
      element: <DashboardLayout />,
      children: [
        { path: "profile", element: <UserProfilePage /> },
        { path: "contract", element: <ContractListPage /> },
        { path: "roomdetails", element: <RoomDetailsPage /> },
        { path: "overnight", element: <OvernightAbsencePage /> },
        { path: "vehicle", element: <MyVehiclePage /> },

        { path: "invoicerent", element: <InvoiceRentPage /> },
        { path: "invoicewater", element: <InvoiceWaterPage /> },
        { path: "invoiceelectric", element: <InvoiceElectricPage /> },
        { path: "invoiceparking", element: <InvoiceParkingPage /> },
        { path: "invoiceothers", element: <InvoiceOthersPage /> },

        { path: "request", element: <RequestListPage /> },

        { path: "violation", element: <ViolationMonthListPage /> },
        { path: "violationdetails", element: <ViolationDetailsPage /> },

        { path: "notification", element: <NotificationsPage /> },
        { path: "notificationpost", element: <NotificationPostPage /> },
      ],
    },
    {
      path: "user",
      element: <SimpleLayout />,
      children: [
        { path: "newovernight", element: <OvernightRequestFormPage /> },
        { path: "newrequest", element: <RequestFormPage /> },
        { path: "newvehicle", element: <VehicleRegistrationFormPage /> },
      ],
    },
    {
      path: "admin",
      element: <DashboardLayout />,
      children: [
        { path: "dashboard", element: <AdminDashboardPage /> },
        { path: "profile", element: <AdminProfilePage /> },
        { path: "settings", element: <SystemSettingsPage /> },

        { path: "resident", element: <ResidentListPage /> },

        { path: "workplacelist", element: <WorkplaceListPage /> },
        // { path: 'workplaceform', element: (<WorkplaceFormPage />), },

        { path: "registration", element: <RegistrationListPage /> },

        { path: "overnight", element: <OvernightRequestPage /> },
        { path: "request", element: <RequestListingPage /> },

        { path: "violation", element: <ViolationDetailsListPage /> },
        { path: "violationform", element: <ViolationFormPage /> },

        { path: "invoice", element: <InvoiceListPage /> },
        { path: "invoicecreate", element: <InvoiceCreatePage /> },

        { path: "garage", element: <VehicleGaragePage /> },
        { path: "vehiclelist", element: <VehicleListPage /> },
        {
          path: "vehicleregisterlist",
          element: <VehicleRegistrationListPage />,
        },
        { path: "garageworker", element: <VehicleWorkerPage /> },

        {
          path: "buildings",
          element: <DormitoryBuildingPage />,
        },
        {
          path: "buildings/:buildingId/rooms",
          element: <DormitoryRoomListPage />,
        },
        {
          path: "rooms/:roomId",
          element: <RoomPage />,
        },
        { path: "blockedit", element: <DormitoryBuildingFormPage /> },
        // {
        //   path: "structure/structurename/roomlist",
        //   element: <DormitoryRoomListPage />,
        // },
        // {
        //   path: "structure/structurename/roomlist/room",
        //   element: <RoomPage />,
        // },
        // { path: 'structure/structurename/roomcreate', element: (<DormitoryRoomCreatePage />), },

        { path: "roomtype", element: <RoomTypePage /> },
        { path: "roomservice", element: <RoomServicePage /> },
        { path: "roomserviceedit", element: <RoomServiceFormPage /> },

        { path: "notification", element: <NotificationsPage /> },
        { path: "notificationpost", element: <NotificationPostPage /> },
        { path: "notificationcreate", element: <NotificationNewPostPage /> },
      ],
    },
    {
      path: "admin",
      element: <SimpleLayout />,
      children: [
        { path: "workplaceform", element: <WorkplaceFormPage /> },
        {
          path: "structure/structurename/roomcreate",
          element: <DormitoryRoomCreatePage />,
        },
        { path: "roomtypeedit", element: <RoomTypeFormPage /> },
        { path: "garageform", element: <VehicleGarageCreatePage /> },
      ],
    },

    {
      path: "registration",
      element: <SimpleLayout />,
      children: [
        { path: "policy", element: <RegistrationPolicyPage /> },
        { path: "bed", element: <RoomPickingPage /> },
        { path: "form", element: <RegistrationFormPage /> },
        { path: "preview", element: <RegistrationPreviewPage /> },
        { path: "success", element: <RegistrationSuccessPage /> },
      ],
    },
    {
      path: "registration",
      element: <CompactLayout />,
      children: [{ path: "email", element: <EnterEmailPage /> }],
    },
  ]);
}
