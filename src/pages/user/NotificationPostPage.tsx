// @mui
import { Button, Container, IconButton, MenuItem, Stack, Typography } from '@mui/material';
// routes
import { PATH_USER } from '../../routes/paths';
// utils
// @types
import { INotification } from '../../@types/notification';
// components
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import Markdown from '../../components/markdown';
import MenuPopover from '../../components/menu-popover';
import { useSettingsContext } from '../../components/settings';
import NotificationPostHero from '../../sections/@dashboard/notifications/NotificationPostHero';
// sections



// ----------------------------------------------------------------------

const mockNotification: INotification = {
  notificationID: 1,
  content: "Your payment has been successfully processed.",
  date: "2024-09-10T08:30:00Z",
  title: "Payment Confirmation",
  description: "Your dormitory fee for September has been paid.",
  isRead: false,
  userID: 101,
  adminID: 1,
};

// ----------------------------------------------------------------------

export default function NotificationPostPage() {
  const { themeStretch } = useSettingsContext();

  // const [post, setPost] = useState<INotification | null>(null);

  const [loadingPost, setLoadingPost] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  // setPost(mockNotification);

  const post = mockNotification;

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

  // const getPost = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/blog/post', {
  //       params: { title },
  //     });
  //     setPost(response.data.post);
  //     setLoadingPost(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoadingPost(false);
  //     setErrorMsg(error.message);
  //   }
  // }, [title]);

  // useEffect(() => {
  //   if (title) {
  //     getPost();
  //   }
  // }, [getPost, title]);

  return (
    <>
      <Helmet>
        <title>{`${post?.title || ''} | Notification`}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Post Details"
          links={[
            {
              name: 'Dashboard',
              href: PATH_USER.root,
            },
            {
              name: 'Notification',
              href: PATH_USER.notification.notification,
            },
            {
              name: post?.title,
            },
          ]}
          action={
            <>
              <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
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
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon="eva:trash-2-outline" />
                  Delete
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
            </>





          }

        />

        {post && (
          <Stack
            sx={{
              borderRadius: 2,
              boxShadow: (theme) => ({
                md: theme.customShadows.card,
              }),
            }}
          >
            <NotificationPostHero post={post} />

            <Typography
              variant="h6"
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              {post.description}
            </Typography>

            <Markdown
              children={post.content}
              sx={{
                px: { md: 5 },
              }}
            />

          </Stack>
        )}

        {/* {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>} */}

        {/* {loadingPost && <SkeletonPostDetails />} */}
      </Container>
    </>
  );
}
