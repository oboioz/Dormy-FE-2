import { useState } from "react";
// @mui
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
// @types
// _mock
// components
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";
import { BuildingModel } from "../../../../models/responses/BuildingModels";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../../routes/paths";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  buildings: BuildingModel[];
};

export default function BuildingStructure({ buildings }: Props) {
  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {buildings
          .sort((a, b) => {
            // Sort by isDeleted: non-deleted buildings come first
            if (a.isDeleted && !b.isDeleted) return 1;
            if (!a.isDeleted && b.isDeleted) return -1;

            // If both have the same isDeleted status, sort by name alphabetically
            return a.name.localeCompare(b.name);
          })
          .map((building) => (
            <Box
              key={building.id}
              sx={{
                textDecoration: "none", // Remove underline from links
                color: "inherit", // Keep the default text color
                "&:hover": { opacity: 0.8 }, // Optional hover effect
              }}
            >
              <BuildingCard building={building} />
            </Box>
          ))}
      </Box>
    </>
  );
}

type BuildingCardProps = {
  building: BuildingModel;
};

function BuildingCard({ building }: BuildingCardProps) {
  const { name, totalFloors, totalRooms, genderRestriction } = building;
  const navigate = useNavigate();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State for confirmation dialog
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleCheckDetail = () => {
    navigate(PATH_ADMIN.dormitory.roomList + `?id=${building.id}`);
  };

  // const handleDelete = async () => {
  //   handleClosePopover();
  //   var isDeleted = await httpClient.buildingService.softDeleteBuilding(
  //     building.id
  //   );
  //   if (isDeleted) {
  //     toast.success(`Delete building ${building.name} success`);
  //     window.location.reload();
  //   } else {
  //     toast.error("An error occurred, please try again later");
  //   }
  // };

  const handleEdit = () => {
    handleClosePopover();
    console.log("EDIT", name);
  };

  const handleDelete = async () => {
    setOpenConfirmDialog(false); // Close the confirmation dialog
    handleClosePopover(); // Close the popover

    const isDeleted = await httpClient.buildingService.softDeleteBuilding(
      building.id
    );
    if (isDeleted) {
      toast.success(`Delete building ${building.name} success`);
      window.location.reload();
    } else {
      toast.error("An error occurred, please try again later");
    }
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true); // Open the confirmation dialog
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false); // Close the confirmation dialog
  };

  return (
    <>
      <Card
        sx={{
          py: 5,
          display: "flex",
          position: "relative",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: building.isDeleted
            ? "rgba(255, 0, 0, 0.1)"
            : "white", // Light red background for deleted buildings
          border: building.isDeleted ? "2px dashed red" : "1px solid #e0e0e0", // Dashed red border for deleted buildings
          opacity: building.isDeleted ? 0.7 : 1, // Slight transparency for deleted buildings
        }}
      >
        {/* <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} /> */}

        <Iconify
          icon={
            genderRestriction === "MALE"
              ? "mdi:gender-male"
              : "mdi:gender-female"
          }
          sx={{
            width: 64,
            height: 64,
            color: genderRestriction === "MALE" ? "blue.700" : "pink.700", // Icon color
          }}
        />

        <Link variant="subtitle1" color="text.primary">
          {name}
        </Link>

        {/* <Stack spacing={2.5}> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2.5}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={2.5}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 1, mt: 0.5 }}
            >
              Floor Number: {totalFloors}
            </Typography>
          </Stack>

          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={2.5}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 1, mt: 0.5 }}
            >
              Empty Bed: 200
            </Typography>
          </Stack>
        </Stack>
        {/* </Stack> */}

        <IconButton
          color={openPopover ? "inherit" : "default"}
          onClick={handleOpenPopover}
          sx={{ top: 8, right: 8, position: "absolute" }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
      >
        <MenuItem
          onClick={handleCheckDetail}
          disabled={building.isDeleted}
          sx={{ color: "primary.main" }}
        >
          <Iconify icon="eva:info-outline" />
          Detail
        </MenuItem>

        <MenuItem
          onClick={handleOpenConfirmDialog}
          disabled={building.isDeleted}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEdit} disabled={building.isDeleted}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete the building <strong>{name}</strong>
            ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------
