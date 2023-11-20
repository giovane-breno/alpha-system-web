import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Delete, FilterList, Info, MoreHoriz } from '@mui/icons-material';
import { Autocomplete, Box, Button, Card, Chip, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SvgIcon, Switch, Tab, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tabs, TextField, Tooltip, Typography } from '@mui/material';
import { isEmptyArray } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import { CheckExistingCompany } from 'src/services/CompaniesService';
import { doWorkersPayment } from 'src/services/FinanceService';
import { FetchWorkers } from 'src/services/WorkersService';

export const GenerateDemonstrative = () => {
  useEffect(() => {
    setFormHeader({
      ...formHeader,
      company: CheckExistingCompany(),
    });
  }, []);

  const [formHeader, setFormHeader] = useState({
    company: null,
    option: 'all',
    worker: null,
  });

  const { data: workersArray } = FetchWorkers(formHeader.company);

  const doPayment = async () => {
    try {
      const { data, status } = await doWorkersPayment(formHeader.worker?.id);
      if (status === 'success') {
        if (formHeader.worker?.id) {
          enqueueSnackbar(`Demonstrativo de ${formHeader.worker.full_name} gerado com sucesso!`, { variant: 'success', position: 'top-right' });
        } else {
          enqueueSnackbar('Demonstrativos gerados com sucesso!', { variant: 'success', position: 'top-right' });

          data?.generated > 0 &&
            enqueueSnackbar(`${data?.generated} holerites foram gerados!`, { variant: 'info', position: 'top-right' });

          data?.not_generated > 0 &&
            enqueueSnackbar(`${data?.not_generated} holerites não foram gerados!`, { variant: 'warning', position: 'top-right' });

        }

        setFormHeader({
          ...formHeader,
          worker: null,
        })

      }
    } catch (error) {      
      if (formHeader.worker?.id) {
        enqueueSnackbar(`O funcionário selecionado já possui o holerite desse mês.`, { variant: 'error', position: 'top-right' });
      } else {
        enqueueSnackbar('Houve um erro ao gerar holerites.', { variant: 'error', position: 'top-right' });
      }
    }
  };

  return (
    <Card>
      <Grid container spacing={2} p={2} >
        <Grid item md={4} xs={0} />
        <Grid item md={8} xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle'>Gerar Demonstrativo</Typography>
          </Box>
          <Box sx={{ pb: 3 }}>
            <TextField fullWidth InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 500, display: "inline-block" }}
              id="outlined-basic" label="Empresa Vinculada *" variant="filled"
              value={formHeader.company && formHeader.company.name}
              error={!!(!formHeader.company)}
              helperText={!formHeader.company && "Necessário selecionar uma empresa!"}
            />
          </Box>
          {formHeader.company &&
            <Box>
              <FormGroup>
                <FormLabel component="legend">Área de Abrangência
                  <Tooltip title="Área de Abrangência, sendo todos os funcionários da empresa selecionada ou um funcionário individual.">
                    <IconButton>
                      <Info />
                    </IconButton>
                  </Tooltip>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="all"
                  name="radio-buttons-group"
                  value={formHeader.option}
                  onChange={(e, value) => {
                    setFormHeader({
                      ...formHeader,
                      worker: null,
                      option: value,
                    });
                  }}                >
                  <FormControlLabel value="all" control={<Radio />} label="Todos" />
                  <FormControlLabel value="one" control={<Radio />} label="Individual" />
                </RadioGroup>
              </FormGroup>
            </Box>
          }
        </Grid>
      </Grid>

      {formHeader.option === 'one' &&
        <Divider />
      }
      <Grid container spacing={2} p={2}>
        <Grid item md={4} xs={0} />
        <Grid item md={8} xs={12}>
          <Collapse in={!!(formHeader.option === 'one')}>
            <Box sx={{ pb: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant='subtitle'>Demonstrativo Individual</Typography>
              </Box>
              {!!(!isEmptyArray(workersArray)) &&
                <Autocomplete
                  fullWidth
                  options={workersArray}
                  getOptionLabel={option => option.full_name}
                  value={formHeader.worker}
                  onChange={(e, value) => {
                    setFormHeader({
                      ...formHeader,
                      worker: value,
                    });
                  }}
                  sx={{ maxWidth: 500, display: "inline-block" }}
                  renderInput={(params) => <TextField {...params} label="Funcionário *" />}
                />
              }

            </Box>
          </Collapse>
          <Box>
            <Button variant="contained" onClick={doPayment} fullWidth color='warning' disabled={!!(!formHeader.company)} sx={{ maxWidth: 500 }}>Gerar Demonstrativo</Button>
          </Box>
        </Grid>
      </Grid>

    </Card >
  );
};