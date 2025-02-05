import {
  Avatar,
  Box,
  Card,
  Link,
  Typography,
} from '@mui/material';
// @types
import { IAdmin } from '../../@types/admin';

// ----------------------------------------------------------------------


type Props = {
  workers: IAdmin[];
};


export default function GarageWorkers({ workers }: Props) {

  return (
    <>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {workers.map((worker) => (
          <WorkerCard key={worker.adminID} worker={worker} />
        ))}
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

type WorkerCardProps = {
  worker: IAdmin;
};

function WorkerCard({ worker }: WorkerCardProps) {
  const { firstname, lastname, jobTitle, email, imageURL } = worker;

  return (
    <>
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar alt={firstname} src={imageURL} sx={{ width: 64, height: 64, mb: 3 }} />

        <Link variant="subtitle1" color="text.primary">
          {firstname + ' ' + lastname}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 0.5 }}>
          {jobTitle}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 0.5 }}>
          {email}
        </Typography>


      </Card>

    </>
  );
}