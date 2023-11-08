import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { FilterList } from '@mui/icons-material';
import { Card, Grid, IconButton, InputAdornment, OutlinedInput, SvgIcon, TextField } from '@mui/material';

export const RhSearch = () => (
  <Card sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField fullWidth label="Buscar Empresa" variant="outlined" sx={{ maxWidth: 500 }} InputProps={{
          endAdornment: <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>,
        }} />
      </Grid>
      <Grid item xs={4} sx={{ textAlign: 'right' }}>
        <IconButton sx={{
        }}
          size='large'>
          <FilterList sx={{
            height: "32px",
            width: '32px'
          }} />
        </IconButton>
      </Grid>
    </Grid>
  </Card>
);
