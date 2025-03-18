import { useState } from 'react';
// @mui
import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
// utils
// @types
// components
import { IAdmin } from '../../../../@types/admin';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { CustomAvatar } from '../../../../components/custom-avatar';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IAdmin;


};

export default function GarageWorkerRow({
  row
}: Props) {
  const { firstName, lastName, phoneNumber, email, jobTitle } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

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
      <TableRow hover>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={firstName} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {firstName} {lastName}
              </Typography>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{phoneNumber}</TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="center">{jobTitle}</TableCell>



        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            // onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            // onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleCloseConfirm}>
            Delete
          </Button>
        }
      />
    </>
  );
}
