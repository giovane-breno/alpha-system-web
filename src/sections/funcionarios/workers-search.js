import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Filter, FilterAlt, FilterList } from '@mui/icons-material';
import { Button, Card, Grid, IconButton, InputAdornment, OutlinedInput, SvgIcon, TextField } from '@mui/material';
import { FilterModal } from './modal/workers-filter-modal';

export const WorkersSearch = ({filter, setFilter}) => (
  <Card sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField fullWidth label="Buscar Funcionário" value={filter} onChange={e => setFilter(e.target.value)} variant="outlined" sx={{ maxWidth: 500 }} InputProps={{
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
    </Grid>
  </Card>
);
