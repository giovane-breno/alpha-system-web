import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Close, Delete, Filter, FilterAlt, FilterList, Save } from '@mui/icons-material';
import { Autocomplete, Box, Button, Card, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, SvgIcon, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from '@mui/x-date-pickers/locales';

import { useState } from 'react';
import ReactInputMask from 'react-input-mask';


export const CompaniesForm = () => {
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
                                <TextField fullWidth label="Nome Fantasia" variant="outlined" required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Razão Social" variant="outlined" required />
                            </Grid>
                            <Grid item xs={12}>
                                <ReactInputMask
                                    mask="99.999.999/0001-99"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField fullWidth label="CNPJ" variant="outlined" required />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="999.999.999.999"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField fullWidth label="Inscrição Estadual" variant="outlined" required />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="999.999.999.999"
                                // value={this.state.phone}
                                // onChange={this.onChange}
                                >
                                    {() => <TextField fullWidth label="Inscrição Municipal" variant="outlined" required />
                                    }
                                </ReactInputMask>
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
