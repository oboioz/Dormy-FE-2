// form
import { useForm } from "react-hook-form";
// @mui
import { Stack, Card, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// @types
// components
import Iconify from "../../../../components/iconify";
import { useSnackbar } from "../../../../components/snackbar";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: "facebookLink",
    icon: <Iconify icon="eva:facebook-fill" width={24} />,
  },
  {
    value: "instagramLink",
    icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
  },
  {
    value: "linkedinLink",
    icon: <Iconify icon="eva:linkedin-fill" width={24} />,
  },
  {
    value: "twitterLink",
    icon: <Iconify icon="eva:twitter-fill" width={24} />,
  },
] as const;

// ----------------------------------------------------------------------

type FormValuesProps = any;

type Props = {
  socialLinks: any;
};

export default function AccountSocialLinks({ socialLinks }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    facebookLink: socialLinks.facebookLink,
    instagramLink: socialLinks.instagramLink,
    linkedinLink: socialLinks.linkedinLink,
    twitterLink: socialLinks.twitterLink,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Update success!");
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              variant="outlined"
              key={link.value}
              name={link.value}
              label={link.value
                .replace("Link", "")
                .replace(/^\w/, (c) => c.toUpperCase())}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
