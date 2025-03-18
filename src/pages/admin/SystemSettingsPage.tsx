
// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from '@mui/material';

// components
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import FormProvider from '../../components/hook-form';
import RHFSwitch from '../../components/hook-form/RHFSwitch';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  TableHeadCustom
} from '../../components/table';
import { PATH_ADMIN } from '../../routes/paths';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Request ID', align: 'left' },
  { id: 'parameter', label: 'Parameter', align: 'center' },
  { id: 'settings', label: 'Settings', align: 'left' },

];

type FormValuesProps = {
  newRegisterStartDate: Date | null;
  newRegisterEndDate: Date | null;
  extendContractStartDate: Date | null;
  extendContractEndDate: Date | null;
  garageAvailable: boolean;
};

const defaultValues = {
  newRegisterStartDate: new Date(),
  newRegisterEndDate: null,
  extendContractStartDate: new Date(),
  extendContractEndDate: null,
  garageAvailable: false,
};

const FormSchema = Yup.object().shape({
  newRegisterStartDate: Yup.date().nullable().required('Start date is required'),
  newRegisterEndDate: Yup.date()
    .required('End date is required')
    .nullable()
    .min(Yup.ref('newRegisterStartDate'), 'End date must be later than start date'),

  extendContractStartDate: Yup.date().nullable().required('Start date is required'),
  extendContractEndDate: Yup.date()
    .required('End date is required')
    .nullable()
    .min(Yup.ref('extendContractStartDate'), 'End date must be later than start date'),

  garageAvailable: Yup.boolean().oneOf([true], 'Switch is required'),

});



// ----------------------------------------------------------------------

export default function SystemSettingsPage() {
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
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

  const { themeStretch } = useSettingsContext();


  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('DATA', data);
    reset();
  };



  return (
    <>
      <Helmet>
        <title>System Settings Page</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Request List"
          links={[
            { name: 'Dashboard', href: PATH_ADMIN.root },
            { name: 'Admin', href: PATH_ADMIN.profile },
            { name: 'System Settings' },
          ]}
          action={
            // <Button
            //   size="small"
            //   variant="contained"
            //   onClick={handleSubmit}
            //   startIcon={<Iconify icon="eva:plus-fill" />}
            // >
            //   Add new address
            // </Button>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Confirm Changes
            </LoadingButton>
          }
        />

        <Card>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

              <Scrollbar>
                <Table size={'medium'} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    headLabel={TABLE_HEAD}
                  // rowCount={tableData.length}
                  />

                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>New Registration Start Date</TableCell>
                      <TableCell>
                        <Controller
                          name="newRegisterStartDate"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <DatePicker
                              {...field}
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
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>New Registration End Date</TableCell>
                      <TableCell>
                        <Controller
                          name="newRegisterEndDate"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <DatePicker
                              {...field}
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
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>Extend Contract Start Date</TableCell>
                      <TableCell>
                        <Controller
                          name="extendContractStartDate"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <DatePicker
                              {...field}
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
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>Extend Contract End Date</TableCell>
                      <TableCell>
                        <Controller
                          name="extendContractEndDate"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <DatePicker
                              {...field}
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
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell>Garage Registration</TableCell>
                      <TableCell>
                        <RHFSwitch name="switch" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </FormProvider>
        </Card>
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------