import { useState } from "react";
// @mui
import {
  Box,
  Card,
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
        {buildings.map((building) => (
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

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleCheckDetail = () => {
    navigate(PATH_ADMIN.dormitory.roomList + `?id=${building.id}`);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log("DELETE", name);
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log("EDIT", name);
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
        <MenuItem onClick={handleCheckDetail} sx={{ color: "primary.main" }}>
          <Iconify icon="eva:info-outline" />
          Detail
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------
