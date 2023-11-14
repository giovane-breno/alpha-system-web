import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Close, Delete, Filter, FilterAlt, FilterList, Save } from '@mui/icons-material';
import { Autocomplete, Box, Button, Card, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, SvgIcon, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from '@mui/x-date-pickers/locales';
import { SnackbarProvider, enqueueSnackbar, useSnackbar } from 'notistack';

import { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { CreateCompany, QueryCEP } from 'src/services/CompaniesService';
import { CreateWorker } from 'src/services/WorkersService';


export const CompaniesForm = () => {
    const [name, setName] = useState();
    const [corporate_name, setCorporateName] = useState();
    const [cnpj, setCNPJ] = useState();
    const [town, setTown] = useState();
    const [state, setState] = useState();

    const [cep, setCEP] = useState();
    const [street, setStreet] = useState();
    const [district, setDistrict] = useState();
    const [city, setCity] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [complement, setComplement] = useState();
    const [references, setReferences] = useState();

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (cep && (cep.length == 9)) {
                const cepReplaced = cep.replace('-', '');
                const { data } = await QueryCEP(cepReplaced);
                if (data) {
                    enqueueSnackbar('CEP encontrado com sucesso!', { variant: 'info', position: 'top-right' });
                    setStreet(data.logradouro);
                    setDistrict(data.bairro);
                    setCity(data.localidade);
                }
            }

        }, 1000)

        return () => clearTimeout(delayDebounceFn);
    }, [cep]);

    const saveForm = async () => {
        try {
            const address = { cep: cep, street: street, district: district, city: city, house_number: houseNumber, complement: complement, references: references };
            const { status } = await CreateCompany(name, corporate_name, cnpj, town, state, address);
            if (status === 'success') {
                enqueueSnackbar('Empresa cadastrada com sucesso!', { variant: 'success', position: 'top-right' });

                setName();
                setCorporateName();
                setCNPJ();
                setTown();
                setState();

                setCEP();
                setStreet();
                setDistrict();
                setCity();
                setHouseNumber();
                setComplement();
                setReferences();

            }
        } catch (error) {

        }
    }

    return (
        <Card sx={{ p: 2 }}>
            <Box>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='title'>Dados Básicos</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Nome Fantasia" variant="outlined" required value={name} onChange={(e) => setName(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Razão Social" variant="outlined" required value={corporate_name} onChange={(e) => setCorporateName(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <ReactInputMask
                                    mask="99.999.999/0001-99"
                                    value={cnpj}
                                    onChange={(e) => setCNPJ(e.target.value)}
                                >
                                    {() => <TextField fullWidth label="CNPJ" variant="outlined" required />}
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="999.999.999.999"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    {() => <TextField fullWidth label="Inscrição Estadual" variant="outlined" required />}
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="999.999.999.999"
                                    value={town}
                                    onChange={(e) => setTown(e.target.value)}
                                >
                                    {() => <TextField fullWidth label="Inscrição Municipal" variant="outlined" required />}
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
                                    value={cep}
                                    onChange={(e) => setCEP(e.target.value)}
                                >
                                    {() => <TextField fullWidth label="CEP" variant="outlined" helperText="Preencha um CEP válido para busca de dados." required />}
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Rua" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} variant="filled" value={street} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Bairro" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} variant="filled" value={district} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Cidade / UF" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} variant="filled" value={city} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Nº da Casa" variant="outlined" required value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Complemento" variant="outlined" value={complement} onChange={(e) => setComplement(e.target.value)} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Referências" variant="outlined" value={references} onChange={(e) => setReferences(e.target.value)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ m: 2 }} />
            <Box sx={{ justifyContent: 'right', display: 'flex' }}>
                <Button variant="contained" color='info' onClick={saveForm} startIcon={<Save />} >
                    Salvar
                </Button>
            </Box>
        </Card>
    );
}
