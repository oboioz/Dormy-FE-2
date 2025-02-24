// @mui
import { Button, Divider, Grid, MenuItem, Stack, StackProps, TextField, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/lab';
import { useCallback } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as Yup from "yup";
import { IDocuments, IUser } from '../../@types/user';
import { RHFTextField } from '../../components/hook-form';
import { RHFMultiCheckbox } from '../../components/hook-form/RHFCheckbox';
import { RHFSelect } from '../../components/hook-form/RHFSelect';
import { RHFUpload } from '../../components/hook-form/RHFUpload';

// ----------------------------------------------------------------------

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

type Props = {
  generalInformation: IUser;
  documents: IDocuments;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction
};

type FormValuesProps = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  priorities: string[];
  workplaceName: string;
  nationalIDNumber: string;
  portraitPhoto: File | null;
  educationPhoto: File | null;
  nationalIDPhotosFront: File | null;
  nationalIDPhotosBack: File | null;
};



const UpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(6, 'Mininum 6 characters')
    .max(32, 'Maximum 32 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(6, 'Mininum 6 characters')
    .max(32, 'Maximum 32 characters'),
  gender: Yup.string().required('Gender is required!'),
  dateOfBirth: Yup.date().nullable().required('Date of Birth is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  phoneNumber: Yup.string().required('Phone number is required!'),
  priorities: Yup.array().min(1, 'Choose at least one option'),
  workplaceName: Yup.string().required('Workplace name is required!'),
  nationalIDNumber: Yup.string().required('National ID Number is required!'),
  portraitPhoto: Yup.mixed().required('Single upload is required').nullable(),
  educationPhoto: Yup.mixed().required('Single upload is required').nullable(),
  nationalIDPhotosFront: Yup.mixed().required('Single upload is required').nullable(),
  nationalIDPhotosBack: Yup.mixed().required('Single upload is required').nullable(),
});




const defaultValues: FormValuesProps = {
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: new Date(),
  email: '',
  phoneNumber: '',
  priorities: [],
  workplaceName: '',
  nationalIDNumber: '',
  portraitPhoto: null,
  educationPhoto: null,
  nationalIDPhotosFront: null,
  nationalIDPhotosBack: null,
};




export default function GeneralInformationForm({
  generalInformation,
  documents,
  onNextStep,
  onBackStep,
}: Props) {

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('DATA', data);
    reset();
  };


  const handleDropPortraitPhoto = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('portraitPhoto', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropEducationPhoto = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('educationPhoto', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropNationalIDPhotosFront = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('nationalIDPhotosFront', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropNationalIDPhotosBack = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('nationalIDPhotosBack', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const { workplace } = generalInformation;

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6">1. General Information</Typography>
              <Block>
                <Typography variant="body1">Portrait photo</Typography>
                <RHFUpload
                  name="portraitPhoto"
                  maxSize={3145728}
                  onDrop={handleDropPortraitPhoto}
                  onDelete={() => setValue('portraitPhoto', null, { shouldValidate: true })}
                />
              </Block>


              <Block>
                <RHFTextField name="firstName" label="First Name" />
              </Block>

              <Block>
                <RHFTextField name="lastName" label="Last Name" />
              </Block>

              <Block>
                <RHFTextField name="email" label="Email address" />
              </Block>

              <Block>
                <RHFSelect name="gender" label="Gender">
                  <MenuItem value="">None</MenuItem>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Block>

              <Block>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Start date"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Block>

              <Block>
                <RHFTextField name="email" label="Email address" />
              </Block>

              <Block>
                <RHFTextField name="phoneNumber" label="Phone Number" />
              </Block>


              <RHFMultiCheckbox
                row
                name="priority"
                label="Priority"
                spacing={4}
                options={[
                  { value: 'option 1', label: 'Checkbox 1' },
                  { value: 'option 2', label: 'Checkbox 2' },
                  { value: 'option 3', label: 'Checkbox 3' },
                ]}
              />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">2. Education Information</Typography>
              <Block>
                <Typography variant="body1">Education photo</Typography>
                <RHFUpload
                  name="educationPhoto"
                  maxSize={3145728}
                  onDrop={handleDropEducationPhoto}
                  onDelete={() => setValue('educationPhoto', null, { shouldValidate: true })}
                />
              </Block>

              <Block>
                <RHFSelect name="workplaceName" label="Workplace">
                  <MenuItem value="">None</MenuItem>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Block>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">3. National Identity Information</Typography>
              <Block>
                <Typography variant="body1">National ID Photo Front</Typography>
                <RHFUpload
                  name="nationalIDPhotosFront"
                  maxSize={3145728}
                  onDrop={handleDropNationalIDPhotosFront}
                  onDelete={() => setValue('nationalIDPhotosFront', null, { shouldValidate: true })}
                />
              </Block>

              <Block>
                <Typography variant="body1">National ID Photo Back</Typography>
                <RHFUpload
                  name="nationalIDPhotosBack"
                  maxSize={3145728}
                  onDrop={handleDropNationalIDPhotosBack}
                  onDelete={() => setValue('nationalIDPhotosBack', null, { shouldValidate: true })}
                />
              </Block>

              <Block>
                <RHFTextField name="nationalIDNumber" label="National Identity Number" />
              </Block>


            </Stack>
          </Grid>

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Button
              fullWidth
              size="large"
              variant="text"
              onClick={onBackStep}
            >
              Check Out
            </Button>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={onNextStep}
            >
              Check Out
            </Button>
          </Stack>

        </Grid>



      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label = 'RHFTextField', sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'italic',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

