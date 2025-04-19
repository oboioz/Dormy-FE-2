import { useState } from "react";
// @mui
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
// @types
import { IUser } from "../../../../@types/user";
// components
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import MenuPopover from "../../../../components/menu-popover";
import { Profile } from "../../../../models/responses/UserModel";
import { getGenderDescription } from "../../../../models/enums/GenderEnum";
import UserStatusTag from "../../../tag/UserStatusTag";
import UserProfileModal from "./UserProfileModal";

// ----------------------------------------------------------------------

type Props = {
  row: Profile;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
};

export default function ResidentTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const handleOpenViewDetail = () => {
    setOpenViewDetail(true);
  };

  const handleCloseViewDetail = () => {
    setOpenViewDetail(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{row.nationalIdNumber}</TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {row.lastName} {row.firstName}
          </Typography>
        </TableCell>

        <TableCell align="left">{getGenderDescription(row.gender)}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.phoneNumber}</TableCell>
        <TableCell align="left">
          <UserStatusTag status={row.status} />
        </TableCell>

        <TableCell align="right">
          <IconButton
            onClick={() => {
              // onViewRow();
              handleOpenViewDetail();
              // handleClosePopover();
            }}
          >
            <Iconify icon="eva:eye-outline" />
          </IconButton>
        </TableCell>
        {/* <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleOpenConfirm}>
            Delete
          </Button>
        }
      />

      {openViewDetail && (
        <UserProfileModal
          open={openViewDetail}
          onClose={handleCloseViewDetail}
          userId={row.userId}
        />
      )}
    </>
  );
}
