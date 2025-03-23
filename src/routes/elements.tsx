import { ElementType, Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/user/UserProfilePage')));
export const ContractListPage = Loadable(lazy(() => import('../pages/user/ContractListPage')));
export const RoomDetailsPage = Loadable(lazy(() => import('../pages/user/RoomDetailsPage')));


export const OvernightAbsencePage = Loadable(lazy(() => import('../pages/user/OvernightAbsencePage')));
export const OvernightRequestFormPage = Loadable(lazy(() => import('../pages/user/OvernightRequestFormPage')));

export const MyVehiclePage = Loadable(lazy(() => import('../pages/user/MyVehiclePage')));
export const VehicleRegistrationFormPage = Loadable(lazy(() => import('../pages/user/VehicleRegistrationFormPage')));


export const InvoiceRentPage = Loadable(lazy(() => import('../pages/user/InvoiceRentPage')));
export const InvoiceWaterPage = Loadable(lazy(() => import('../pages/user/InvoiceWaterPage')));
export const InvoiceParkingPage = Loadable(lazy(() => import('../pages/user/InvoiceParkingPage')));
export const InvoiceOthersPage = Loadable(lazy(() => import('../pages/user/InvoiceOthersPage')));
export const InvoiceElectricPage = Loadable(lazy(() => import('../pages/user/InvoiceElectricPage')));



export const NotificationsPage = Loadable(lazy(() => import('../pages/user/NotificationsPage')));
export const NotificationPostPage = Loadable(lazy(() => import('../pages/user/NotificationPostPage')));

export const RequestListPage = Loadable(lazy(() => import('../pages/user/RequestListPage')));
export const RequestFormPage = Loadable(lazy(() => import('../pages/user/RequestListPage')));

export const ViolationMonthListPage = Loadable(lazy(() => import('../pages/user/ViolationMonthListPage')));
export const ViolationDetailsPage = Loadable(lazy(() => import('../pages/user/ViolationDetailsPage')));

// ADMIN
export const AdminDashboardPage = Loadable(lazy(() => import('../pages/admin/AdminDashboardPage')));
export const AdminProfilePage = Loadable(lazy(() => import('../pages/admin/AdminProfilePage')));
export const SystemSettingsPage = Loadable(lazy(() => import('../pages/admin/SystemSettingsPage')));

export const ResidentListPage = Loadable(lazy(() => import('../pages/admin/ResidentListPage')));

export const OvernightRequestPage = Loadable(lazy(() => import('../pages/admin/OvernightRequestPage')));
export const RequestListingPage = Loadable(lazy(() => import('../pages/admin/RequestListingPage')));

export const InvoiceListPage = Loadable(lazy(() => import('../pages/admin/InvoiceListPage')));
export const InvoiceCreatePage = Loadable(lazy(() => import('../pages/admin/InvoiceCreatePage')));

export const VehicleGarageCreatePage = Loadable(lazy(() => import('../pages/admin/VehicleGarageCreatePage')));
export const VehicleGaragePage = Loadable(lazy(() => import('../pages/admin/VehicleGaragePage')));
export const VehicleListPage = Loadable(lazy(() => import('../pages/admin/VehicleListPage')));
export const VehicleRegistrationListPage = Loadable(lazy(() => import('../pages/admin/VehicleRegistrationListPage')));
export const VehicleWorkerPage = Loadable(lazy(() => import('../pages/admin/VehicleWorkerPage')));

export const WorkplaceListPage = Loadable(lazy(() => import('../pages/admin/WorkplaceListPage')));
export const WorkplaceFormPage = Loadable(lazy(() => import('../pages/admin/WorkplaceFormPage')));

export const RegistrationListPage = Loadable(lazy(() => import('../pages/admin/RegistrationListPage')));

export const RoomTypePage = Loadable(lazy(() => import('../pages/admin/RoomTypePage')));
export const RoomTypeFormPage = Loadable(lazy(() => import('../pages/admin/RoomTypeFormPage')));

export const RoomServicePage = Loadable(lazy(() => import('../pages/admin/RoomServicePage')));
export const RoomServiceFormPage = Loadable(lazy(() => import('../pages/admin/RoomServiceFormPage')));

export const DormitoryBuildingPage = Loadable(lazy(() => import('../pages/admin/DormitoryBuildingPage')));
export const DormitoryBuildingFormPage = Loadable(lazy(() => import('../pages/admin/DormitoryBuildingFormPage')));

export const DormitoryRoomListPage = Loadable(lazy(() => import('../pages/admin/DormitoryRoomListPage')));
export const DormitoryRoomCreatePage = Loadable(lazy(() => import('../pages/admin/DormitoryRoomCreatePage')));

export const NotificationNewPostPage = Loadable(lazy(() => import('../pages/admin/NotificationNewPostPage')));

export const ViolationDetailsListPage = Loadable(lazy(() => import('../pages/admin/ViolationDetailsListPage')));
export const ViolationFormPage = Loadable(lazy(() => import('../pages/admin/ViolationFormPage')));


// REGISTER
export const RegistrationPolicyPage = Loadable(lazy(() => import('../pages/registration/RegistrationPolicyPage')));
export const EnterEmailPage = Loadable(lazy(() => import('../pages/registration/EnterEmailPage')));
export const RoomPickingPage = Loadable(lazy(() => import('../pages/registration/RoomPickingPage')));
export const RegistrationFormPage = Loadable(lazy(() => import('../pages/registration/RegistrationFormPage')));
export const RegistrationPreviewPage = Loadable(lazy(() => import('../pages/registration/RegistrationPreviewPage')));
export const RegistrationSuccessPage = Loadable(lazy(() => import('../pages/registration/RegistrationSuccessPage')));



// // TEST RENDER PAGE BY ROLE
// export const PermissionDeniedPage = Loadable(
//   lazy(() => import('../pages/dashboard/PermissionDeniedPage'))
// );

// // BLANK PAGE
// export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

// // MAIN
// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
// export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
// export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
// export const FaqsPage = Loadable(lazy(() => import('../pages/FaqsPage')));
// export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
// export const Contact = Loadable(lazy(() => import('../pages/ContactPage')));
// export const PricingPage = Loadable(lazy(() => import('../pages/PricingPage')));
// export const PaymentPage = Loadable(lazy(() => import('../pages/PaymentPage')));
// export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
// export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));