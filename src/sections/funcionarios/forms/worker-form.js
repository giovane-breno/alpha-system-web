import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Close, Delete, Filter, FilterAlt, FilterList, Save } from '@mui/icons-material';
import { Autocomplete, Box, Button, Card, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, SvgIcon, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from '@mui/x-date-pickers/locales';
import { enqueueSnackbar } from 'notistack';

import { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { CheckExistingCompany, QueryCEP } from 'src/services/CompaniesService';
import { CreateWorker, FetchDivisions, FetchRoles } from 'src/services/WorkersService';


export const WorkerForm = () => {
    const { data: divisions, isLoading: divisionsLoading } = FetchDivisions();
    const { data: roles, isLoading: rolesLoading } = FetchRoles();
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        ctps: '',
        pis: '',
        gender: '',
        bornAt: '',
        marital: '',
        scholarity: '',
        phones: '',

        company: '',
        role: null,
        division: null,

        cep: '',
        street: '',
        district: '',
        city: '',
        houseNumber: '',
        complement: '',
        references: '',
    });

    useEffect(() => {
        setForm({
          ...form,
          company: CheckExistingCompany(),
        });
      }, []);

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
            const { status } = await CreateWorker(form);
            if (status === 'success') {
                enqueueSnackbar('Funcionário cadastrado com sucesso!', { variant: 'success', position: 'top-right' });

                setError("");
                setForm({
                    ...form,
                    name: '',
                    email: '',
                    cpf: '',
                    ctps: '',
                    pis: '',
                    gender: '',
                    bornAt: '',
                    marital: '',
                    scholarity: '',
                    phones: '',

                    role: null,
                    division: null,

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
            console.log(error);
            enqueueSnackbar('Verifique os erros do formulário!', { variant: 'error', position: 'top-right' });
            const path = error.response?.data.errors;
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
                                <TextField fullWidth label="Nome" variant="outlined" required value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }) }} error={!!(error?.name)} helperText={error?.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Email" variant="outlined" required value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }) }} error={!!(error?.email)} helperText={error?.email} />
                            </Grid>
                            <Grid item xs={4}>
                                <ReactInputMask
                                    mask="999.999.999-99"
                                    value={form.cpf}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            cpf: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField fullWidth label="CPF" variant="outlined" required error={!!(error?.cpf)} helperText={error?.cpf} />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={4}>
                                <ReactInputMask
                                    mask="9999999/9999"
                                    value={form.ctps}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            ctps: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField fullWidth label="CTPS" variant="outlined" required error={!!(error?.ctps)} helperText={error?.ctps} />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={4}>
                                <ReactInputMask
                                    mask="999.99999.99-9"
                                    value={form.pis}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            pis: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField fullWidth label="PIS" variant="outlined" required error={!!(error?.pis)} helperText={error?.pis} />
                                    }
                                </ReactInputMask>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={list_gender}
                                    sx={{ display: 'inline-block' }}
                                    value={form.gender}
                                    onChange={(e, value) => {
                                        setForm({
                                            ...form,
                                            gender: value.label,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Gênero" required error={!!(error?.gender)} helperText={error?.gender} />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Nascimento" variant="outlined" format="dd/MM/yyyy"
                                        disableFuture
                                        value={form.bornAt}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                bornAt: e,
                                            });
                                        }} slotProps={{
                                            textField: {
                                                fullWidth: 'true',
                                                required: 'true',
                                                error: !!(error?.born_at),
                                                helperText: error?.born_at
                                            },
                                        }}

                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={list_marital_status}
                                    sx={{ display: 'inline-block' }}
                                    value={form.marital}
                                    onChange={(e, value) => {
                                        setForm({
                                            ...form,
                                            marital: value.label,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Estado Civil" required error={!!(error?.marital_status)} helperText={error?.marital_status} />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={list_scholarity}
                                    sx={{ display: 'inline-block' }}
                                    value={form.scholarity}
                                    onChange={(e, value) => {
                                        setForm({
                                            ...form,
                                            scholarity: value.label,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Escolaridade" required error={!!(error?.education_level)} helperText={error?.education_level} />} />
                            </Grid>
                            <Grid item xs={6}>
                                <ReactInputMask
                                    mask="(99) 99999-9999"
                                    value={form.phones}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            phones: e.target.value,
                                        });
                                    }}
                                >
                                    {() => <TextField
                                        fullWidth
                                        label={"Telefone / Celular"}
                                        variant="outlined" required error={!!(error?.phones?.phones_number)} helperText={error?.phones?.phones_number} />}
                                </ReactInputMask>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='title'>Função & Divisão</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Empresa" value={form.company.name} variant="filled" inputProps={{ readOnly: true }} required />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={roles}
                                    sx={{ display: 'inline-block' }}
                                    getOptionLabel={option => option.name}
                                    value={form.role}
                                    onChange={(e, value) => {
                                        setForm({
                                            ...form,
                                            role: value,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Função" required error={!!(error?.role)} helperText={error?.role} />}
                                />
                            </Grid>
                            
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    options={divisions}
                                    getOptionLabel={option => option.name}
                                    sx={{ display: 'inline-block' }}
                                    value={form.division}
                                    onChange={(e, value) => {
                                        setForm({
                                            ...form,
                                            division: value,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Divisão" required error={!!(error?.division)} helperText={error?.division} />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
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
                </Grid>

            </Box>
            <Divider sx={{ m: 2 }} />
            <Box sx={{ justifyContent: 'right', display: 'flex' }}>
                <Button variant="contained" color='info' onClick={saveForm} startIcon={<Save />} >
                    Salvar
                </Button>
            </Box>
        </Card >
    );
}

const list_marital_status = [
    { label: 'Solteiro' },
    { label: 'Casado' },
    { label: 'Divorciado' },
    { label: 'Viúvo' },
];

const list_gender = [
    { label: 'Masculino' },
    { label: 'Feminino' },
];

const list_scholarity = [
    { label: 'Ensino Médio Incompleto' },
    { label: 'Ensino Médio Completo' },
    { label: 'Ensino Superior Incompleto' },
    { label: 'Ensino Superior Completo' },
    { label: 'Pós-graduação' },
];
