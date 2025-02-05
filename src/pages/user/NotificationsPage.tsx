import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Container, Grid } from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// components
import { INotification } from '../../@types/notification';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
import { SkeletonPostItem } from '../../components/skeleton';
import BlogPostCard from '../../sections/@dashboard/notifications/NotificationPostCard';
// sections

// ----------------------------------------------------------------------

const mockNotifications: INotification[] = [
  {
    notificationID: 1,
    content: "Your payment has been successfully processed.",
    date: "2024-09-10T08:30:00Z",
    title: "Payment Confirmation",
    description: "Your dormitory fee for September has been paid.",
    isRead: false,
    userID: 101,
    adminID: 1,
  },
  {
    notificationID: 2,
    content: "Maintenance work scheduled for your building.",
    date: "2024-09-12T14:00:00Z",
    title: "Maintenance Notice",
    description: "Water supply will be interrupted from 2 PM to 5 PM.",
    isRead: true,
    userID: 102,
    adminID: 2,
  },
  {
    notificationID: 3,
    content: "New room assignments have been released.",
    date: "2024-09-15T10:00:00Z",
    title: "Room Allocation Update",
    description: "Check the portal to view your new room assignment.",
    isRead: false,
    userID: 103,
    adminID: 1,
  },
  {
    notificationID: 4,
    content: "Your repair request has been approved.",
    date: "2024-09-18T16:45:00Z",
    title: "Repair Request Status",
    description: "The repair request for your AC has been approved.",
    isRead: true,
    userID: 104,
    adminID: 3,
  },
  {
    notificationID: 5,
    content: "Fire drill scheduled for this weekend.",
    date: "2024-09-20T12:00:00Z",
    title: "Safety Alert",
    description: "A mandatory fire drill will be conducted on Sunday.",
    isRead: false,
    userID: 105,
    adminID: 2,
  },
  {
    notificationID: 6,
    content: "Upcoming dormitory event: Cultural Night.",
    date: "2024-09-22T18:30:00Z",
    title: "Event Invitation",
    description: "Join us for a night of performances and food.",
    isRead: false,
    userID: 106,
    adminID: 1,
  },
];



// ----------------------------------------------------------------------

export default function NotificationsPage() {
  const { themeStretch } = useSettingsContext();

  // const [posts, setPosts] = useState([]);

  // const getAllPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/blog/posts');
  //     setPosts(response.data.posts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getAllPosts();
  // }, [getAllPosts]);

  // setPosts(mockNotifications);

  const [posts, setPosts] = useState<INotification[]>([]);

  setPosts(mockNotifications);






  return (
    <>
      {/* <Helmet>
        <title> Blog: Posts | Minimal UI</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Blog"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Blog',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: 'Posts',
            },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.blog.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Post
            </Button>
          }
        />

        <Grid container spacing={3}>
          {(!posts.length ? [...Array(12)] : posts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <BlogPostCard post={post} index={index} />
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

// ----------------------------------------------------------------------
