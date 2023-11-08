import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Filter, FilterAlt, FilterList } from '@mui/icons-material';
import { Button, Card, Grid, IconButton, InputAdornment, OutlinedInput, SvgIcon, TextField } from '@mui/material';
import { FilterModal } from './modal/benefits-filter-modal';

export const BenefitsSearch = () => (
  <Card sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField fullWidth label="Buscar Benefício" variant="outlined" sx={{ maxWidth: 500 }} InputProps={{
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
        <FilterModal />
      </Grid>
    </Grid>
  </Card>
);
