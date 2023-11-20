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
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: '',
        corporate_name: '',
        cnpj: '',
        town: '',
        state: '',

        cep: '',
        street: '',
        district: '',
        city: '',
        houseNumber: '',
        complement: '',
        references: '',
    });


    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (form.cep && (form.cep.length == 9)) {
                const cepReplaced = form.cep.replace('-', '');
                const { data } = await QueryCEP(cepReplaced);
                if (!data.erro) {
                    enqueueSnackbar('CEP encontrado com sucesso!', { variant: 'info', position: 'top-right' });
                    setForm({
                        ...form,
                        street: data.logradouro,
                        district: data.bairro,
                        city: data.localidade
                    });

                } else {
                    enqueueSnackbar('O CEP não foi encontrado!', { variant: 'error', position: 'top-right' });

                    setForm({
                        ...form,
                        street: '',
                        district: '',
                        city: ''
                    });

                    setError({
                        ...error,
                        'address.cep': "O CEP não foi encontrado!",
                    })
                }
            }

        }, 1000)

        return () => clearTimeout(delayDebounceFn);
    }, [form.cep]);

    const saveForm = async () => {
        try {
            const { status } = await CreateCompany(form);
            if (status === 'success') {
                enqueueSnackbar('Empresa cadastrada com sucesso!', { variant: 'success', position: 'top-right' });

                setError("");
                setForm({
                    name: '',
                    corporate_name: '',
                    cnpj: '',
                    town: '',
                    state: '',

                    cep: '',
                    street: '',
                    district: '',
                    city: '',
                    houseNumber: '',
                    complement: '',
                    references: '',
                });
            }
        } catch (error) {
            enqueueSnackbar('Verifique os erros do formulário!', { variant: 'error', position: 'top-right' });
            const path = error.response.data.errors;
            setError(path);
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
                                <TextField fullWidth label="Nome Fantasia" variant="outlined" required value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }) }} error={!!(error?.name)} helperText={error?.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Razão Social" variant="outlined" required value={form.corporate_name} onChange={e => { setForm({ ...form, corporate_name: e.target.value }) }} error={!!(error?.corporate_name)} helperText={error?.corporate_name} />
                            </Grid>
                            <Grid item xs={12}>
                                <ReactInputMask
                                    mask="99.999.999/0001-99"
                                    value={form.cnpj}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            cnpj: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField fullWidth label="CNPJ" variant="outlined" required error={!!(error?.CNPJ)} helperText={error?.CNPJ} />}
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="999.999.999.999"
                                    value={form.state}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            state: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField fullWidth label="Inscrição Estadual" variant="outlined" required error={!!(error?.state_registration)} helperText={error?.state_registration} />}
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="999.999.999.999"
                                    value={form.town}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            town: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField fullWidth label="Inscrição Municipal" variant="outlined" required error={!!(error?.town_registration)} helperText={error?.town_registration} />}
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
                                    value={form.cep}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            cep: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField fullWidth label="CEP" variant="outlined" error={!!(error?.['address.cep'])} helperText={error?.['address.cep'] ? error?.['address.cep'] : "Preencha um CEP válido para busca de dados."} required />}
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Rua" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} variant="filled" value={form.street} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Bairro" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} variant="filled" value={form.district} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Cidade / UF" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} variant="filled" value={form.city} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Nº da Casa" variant="outlined" required value={form.houseNumber} onChange={e => { setForm({ ...form, houseNumber: e.target.value }) }} error={!!(error?.['address.house_number'])} helperText={error?.['address.house_number']} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Complemento" variant="outlined" value={form.complement} onChange={e => { setForm({ ...form, complement: e.target.value }) }} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Referências" variant="outlined" value={form.references} onChange={e => { setForm({ ...form, references: e.target.value }) }} />
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
