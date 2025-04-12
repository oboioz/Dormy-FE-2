import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';

// components
import { INotificationNew } from '../../../@types/notification';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import RHFEditor from '../../../components/hook-form/RHFEditor';
import { RHFUpload } from '../../../components/hook-form/RHFUpload';
import { useSnackbar } from '../../../components/snackbar';
import NotificationNewPostPreview from './notification/NotificationNewPostPreview';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export type FormValuesProps = INotificationNew;

export default function NotificationNewPostForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [openPreview, setOpenPreview] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    cover: Yup.mixed().required('Cover is required').nullable(true),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema) as any,
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      // navigate(PATH_DASHBOARD.blog.posts);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cover', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('cover', null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <RHFTextField name="title" label="Post Title" />

            <RHFTextField name="description" label="Description" multiline rows={3} />

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Content
              </Typography>

              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Cover
              </Typography>

              <RHFUpload
                name="cover"
                maxSize={3145728}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
            </Stack>
          </Stack>
        </Card>


        <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            size="large"
            onClick={handleOpenPreview}
          >
            Preview
          </Button>

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            Post
          </LoadingButton>
        </Stack>
      </Grid>

      <NotificationNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}
