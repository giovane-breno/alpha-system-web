import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, CardMedia, Divider, Grid, IconButton, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { AccountBalance, PlayArrow } from '@mui/icons-material';

export const RhCard = (props) => {
  const { url, title, description, icon } = props;

  return (
    <Link href={url}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          '&:hover': {
            boxShadow: 24,
            ' > div': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        }}
      >
        <Grid container spacing={2} sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
          <Grid item xs={3}>
            {icon}
          </Grid>
          <Grid item xs={9}>
            <div>
              <Typography variant="title" display={'block'}>
                {title}
              </Typography>
              <Typography variant="subtitle">
                {description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

RhCard.propTypes = {
  company: PropTypes.object.isRequired
};
