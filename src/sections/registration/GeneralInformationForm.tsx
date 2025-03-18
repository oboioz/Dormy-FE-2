// @mui
import { Button, Container, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { DatePicker } from '@mui/x-date-pickers';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { IDocuments, IUser } from '../../@types/user';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { RHFMultiCheckbox } from '../../components/hook-form/RHFCheckbox';
import { RHFSelect } from '../../components/hook-form/RHFSelect';
import { RHFUpload } from '../../components/hook-form/RHFUpload';
import Iconify from '../../components/iconify';
import { PATH_REGISTER } from '../../routes/paths';

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
};

type FormValuesProps = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | null;
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
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
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
  dateOfBirth: null,
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
}: Props) {

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema),
    defaultValues,
  });

  const navigate = useNavigate();

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  // const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('DATA', data);
    reset();
  };

  const [portraitPhoto, setPortraitPhoto] = useState<File | string | null>(null);
  const [educationPhoto, setEducationPhoto] = useState<File | string | null>(null);
  const [nationalIDPhotosFront, setNationalIDPhotosFront] = useState<File | string | null>(null);
  const [nationalIDPhotosBack, setNationalIDPhotosBack] = useState<File | string | null>(null);


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
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5 }}>
        Please fill in all the personal information
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">1. General Information</Typography>

              <Typography variant="body1" fontWeight="bold">Portrait photo</Typography>
              <RHFUpload
                name="portraitPhoto"
                maxSize={3145728}
                onDrop={handleDropPortraitPhoto}
                onDelete={() => setValue('portraitPhoto', null, { shouldValidate: true })}
              />




              <RHFTextField name="firstName" label="First Name" />



              <RHFTextField name="lastName" label="Last Name" />



              <RHFSelect name="gender" label="Gender">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    label="Date Of Birth"
                    // inputFormat="dd/MM/yyyy"
                    format="DD/MM/YYYY"
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

              <RHFTextField name="email" label="Email address" />

              <RHFTextField name="phoneNumber" label="Phone Number" />


              <RHFMultiCheckbox
                name="priorities"
                label="Priorities"
                spacing={1}
                options={[
                  { value: 'option 1', label: 'Checkbox 1' },
                  { value: 'option 2', label: 'Checkbox 2' },
                  { value: 'option 3', label: 'Checkbox 3' },
                ]}
              />
            </Stack>

            <Stack spacing={2} sx={{
              pt: 15,
            }}>
              <Typography variant="h6">2. Education Information</Typography>
              <Typography variant="body1" fontWeight="bold">Education photo</Typography>
              <RHFUpload
                name="educationPhoto"
                maxSize={3145728}
                onDrop={handleDropEducationPhoto}
                onDelete={() => setValue('educationPhoto', null, { shouldValidate: true })}
              />

              <RHFSelect name="workplaceName" label="Workplace">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>

            <Stack spacing={2} sx={{
              pt: 15,
            }}>
              <Typography variant="h6">3. National Identity Information</Typography>
              <Typography variant="body1" fontWeight="bold">National ID Photo Front</Typography>
              <RHFUpload
                name="nationalIDPhotosFront"
                maxSize={3145728}
                onDrop={handleDropNationalIDPhotosFront}
                onDelete={() => setValue('nationalIDPhotosFront', null, { shouldValidate: true })}
              />

              <Typography variant="body1" fontWeight="bold">National ID Photo Back</Typography>
              <RHFUpload
                name="nationalIDPhotosBack"
                maxSize={3145728}
                onDrop={handleDropNationalIDPhotosBack}
                onDelete={() => setValue('nationalIDPhotosBack', null, { shouldValidate: true })}
              />

              <RHFTextField name="nationalIDNumber" label="National Identity Number" />


            </Stack>
          </Grid>
        </Grid>
        <Container
          sx={{
            pt: 15,
          }}
        >
          {/* Back to Login Button */}
          <Stack spacing={3} direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={() => navigate(PATH_REGISTER.bed)} // Change this based on your path
              size='large'
            >
              Back Step
            </Button>

            {/* Next Step Button */}
            <Button
              variant="contained"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              onClick={onNextStep} // Change this based on your path
              size='large'
            >
              Next Step
            </Button>
          </Stack>

        </Container>

      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------
