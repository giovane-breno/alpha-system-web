import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Close, Delete, Filter, FilterAlt, FilterList, Save } from '@mui/icons-material';
import { Autocomplete, Box, Button, Card, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, SvgIcon, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from '@mui/x-date-pickers/locales';

import { useState } from 'react';
import ReactInputMask from 'react-input-mask';


export const WorkerForm = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpenMenu = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <Card sx={{ p: 2 }}>
            <Box>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='title'>Dados Básicos</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Nome" variant="outlined" required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Email" variant="outlined" required />
                            </Grid>
                            <Grid item xs={4}>
                                <ReactInputMask
                                    mask="999.999.999-99"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField fullWidth label="CPF" variant="outlined" required />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={4}>
                                <ReactInputMask
                                    mask="9999999/9999"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField fullWidth label="CTPS" variant="outlined" required />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={4}>
                                <ReactInputMask
                                    mask="999.99999.99-9"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField fullWidth label="PIS" variant="outlined" required />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={gender}
                                    sx={{ display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Gênero" required />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Nascimento" variant="outlined" slotProps={{
                                        textField: {
                                            fullWidth: 'true',
                                            required: 'true',
                                        },
                                    }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={marital_status}
                                    sx={{ display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Estado Civil" required />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={scholarity}
                                    sx={{ display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Escolaridade" required />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="(99)99999-9999"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField
                                        fullWidth
                                        label={"Telefone / Celular"}
                                        variant="outlined" required />}
                                </ReactInputMask>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='title'>Função & Divisão</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Empresa" variant="filled" inputProps={{ readOnly: true }} required />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Função" required />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Divisão" required />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='title'>Endereço</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12}>
                                <ReactInputMask
                                    mask="99999-999"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField fullWidth label="CEP" variant="outlined" helperText="Preencha um CEP válido para busca de dados." required />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Rua" inputProps={{ readOnly: true }} variant="filled" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Bairro" inputProps={{ readOnly: true }} variant="filled" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Cidade / UF" inputProps={{ readOnly: true }} variant="filled" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Nº da Casa" variant="outlined" required />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Complemento" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Referências" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Box>
            <Divider sx={{ m: 2 }} />
            <Box sx={{ justifyContent: 'right', display: 'flex' }}>
                <Button variant="contained" color='info' startIcon={<Save />} >
                    Salvar
                </Button>
            </Box>
        </Card>
    );
}

const marital_status = [
    { label: 'Solteiro' },
    { label: 'Casado' },
    { label: 'Divorciado' },
    { label: 'Viúvo' },
];

const gender = [
    { label: 'Masculino' },
    { label: 'Feminino' },
];

const scholarity = [
    { label: 'Ensino Médio Incompleto' },
    { label: 'Ensino Médio Completo' },
    { label: 'Ensino Superior Incompleto' },
    { label: 'Ensino Superior Completo' },
    { label: 'Pós-graduação' },
];


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 }
];
