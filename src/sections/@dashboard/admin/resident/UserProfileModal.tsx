import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { httpClient } from "../../../../services";
import { UserProfileResponseModel } from "../../../../models/responses/UserModel";
import { toast } from "react-toastify";
import { getGenderDescription } from "../../../../models/enums/GenderEnum";
import { fDate } from "../../../../utils/formatTime";
import { ContractStatusEnum } from "../../../../models/enums/ContractStatusEnum";
import ContractStatusTag from "../../../tag/ContractStatusTag";

type UserProfileModalProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  // data: UserProfileResponseModel;
};

export default function UserProfileModal({
  open,
  onClose,
  userId,
}: // data,
UserProfileModalProps) {
  if (userId == null || userId == undefined || userId == "") {
    return <></>;
  }

  const [userProfile, setUserProfile] = useState<UserProfileResponseModel>();

  const fetchUserProfileData = async (userId: string) => {
    try {
      const response =
        await httpClient.userService.getUserProfileByUseridForAdmin(userId);
      if (response) {
        setUserProfile(response);
      } else {
        toast.error("An error occurred while getting user profile.");
      }
    } catch (error) {
      toast.error("An error occurred while getting user profile.");
    }
  };

  useEffect(() => {
    fetchUserProfileData(userId);
  }, [userId]);

  // const { user, guardians, workplace, healthInsurance, contract } = data;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>User Profile Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* User Information Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Full Name:</b> {userProfile?.user?.lastName}{" "}
                  {userProfile?.user?.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b> Date of birth:</b>{" "}
                  {fDate(userProfile?.user?.dateOfBirth, "dd/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Gender:</b>{" "}
                  {getGenderDescription(userProfile?.user?.gender)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Citizen ID:</b> {userProfile?.user?.nationalIdNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Email:</b> {userProfile?.user?.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Phone Number:</b> {userProfile?.user?.phoneNumber}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Guardians Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Guardians
            </Typography>
            <Grid container spacing={2}>
              {userProfile?.guardians?.map((guardian, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <b>Name:</b> {guardian?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <b>Relationship:</b> {guardian?.relationshipToUser}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <b>Phone:</b> {guardian?.phoneNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <b>Email:</b>{" "}
                      {guardian?.email != "" ? guardian?.email : "- -"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Address:</b> {guardian?.address}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Workplace Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Workplace
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Company Name:</b> {userProfile?.workplace?.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Address:</b> {userProfile?.workplace?.address}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Abbreviation:</b> {userProfile?.workplace?.abbrevation}
            </Typography>
          </Box>

          {/* Health Insurance Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Health Insurance
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Insurance Number:</b>{" "}
              {userProfile?.healthInsurance?.insuranceCardNumber}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Expiration date:</b>{" "}
              {fDate(
                userProfile?.healthInsurance?.expirationDate,
                "dd/MM/yyyy"
              )}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Registered hospital:</b>{" "}
              {userProfile?.healthInsurance?.registeredHospital}
            </Typography>
          </Box>

          {/* Contract Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Contract
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Submission date:</b>{" "}
                  {fDate(userProfile?.contract?.submissionDate, "dd/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Status:</b>{" "}
                  {userProfile?.contract?.status ? (
                    <ContractStatusTag
                      status={
                        userProfile?.contract?.status ||
                        ContractStatusEnum.PENDING
                      }
                    />
                  ) : (
                    "N/A"
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Start Date:</b>{" "}
                  {fDate(userProfile?.contract?.startDate, "dd/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>End Date:</b>{" "}
                  {fDate(userProfile?.contract?.endDate, "dd/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Room number:</b>{" "}
                  {userProfile?.contract?.roomNumber || "--"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Building:</b> {userProfile?.contract?.buildingName || "--"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <b>Room type:</b>{" "}
                  {userProfile?.contract?.roomTypeName || "--"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
