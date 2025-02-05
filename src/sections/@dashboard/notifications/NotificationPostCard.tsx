import { paramCase } from 'param-case';

import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, CardContent, Link, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
// utils
import { fDate } from '../../../utils/formatTime';
// @types
// components
import { INotification } from '../../../@types/notification';
import Image from '../../../components/image';
import TextMaxLine from '../../../components/text-max-line';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

type Props = {
  post: INotification;
  index?: number;
};

export default function BlogPostCard({ post, index }: Props) {

  const { title, date } = post;
  const cover = 'https://source.unsplash.com/random';

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Image alt="cover" src={cover} ratio="4/3" />
      </Box>

      <PostContent
        title={title}
        createdAt={date}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  title: string;
  createdAt: Date | string | number;
  index?: number;
};

export function PostContent({ title, createdAt, index }: PostContentProps) {

  const linkTo = PATH_DASHBOARD.blog.view(paramCase(title));

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link color="inherit" component={RouterLink} to={linkTo}>
        <TextMaxLine
          variant={'subtitle2'}
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
        }}
      >
      </Stack>
    </CardContent>
  );
}
