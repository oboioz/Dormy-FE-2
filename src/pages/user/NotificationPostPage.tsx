import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
// @types
import { INotification } from '../../@types/notification';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Markdown from '../../components/markdown';
import { useSettingsContext } from '../../components/settings';
import { SkeletonPostDetails } from '../../components/skeleton';
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

  const [post, setPost] = useState<INotification | null>(null);

  const [loadingPost, setLoadingPost] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  setPost(mockNotification);

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
      {/* <Helmet>
        <title>{`Blog: ${post?.title || ''} | Minimal UI`}</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Post Details"
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
              name: post?.title,
            },
          ]}
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

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}
      </Container>
    </>
  );
}
