import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, CircularProgress, Divider, Grid, IconButton, InputAdornment, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, setRef } from '@mui/material';
import { Close, DataArray, Delete, Done, Edit, ErrorOutline, Info, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { DeleteWorker, DeleteWorkers, FetchDivisions, FetchRoles, FindWorker, UpdateWorker } from 'src/services/WorkersService';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import { QueryCEP } from 'src/services/CompaniesService';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from '@mui/x-date-pickers/locales';
import ReactInputMask from 'react-input-mask';


const large = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%', // Largura padrão
    bgcolor: 'background.paper',
    borderRadius: '.3rem',
    boxShadow: 24,
};

const small = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%', // Largura padrão
    bgcolor: 'background.paper',
    borderRadius: '.3rem',
    boxShadow: 24,
};

export const ViewModal = ({ id, refreshState, setRefreshState }) => {
    const handleClose = () => {
        setOpen(false);
        setDisabled(true);
    };

    const handleEdit = () => setDisabled(!isDisabled);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = useState(false);
    const { data: divisions, isLoading: divisionsLoading } = FetchDivisions();
    const { data: roles, isLoading: rolesLoading } = FetchRoles();

    const [value, setValue] = useState('0');
    const [error, setError] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isDisabled, setDisabled] = useState(true);
    const [form, setForm] = useState({
        name: '',
        email: '',
        born_at: '',

        cpf: '',
        ctps: '',
        pis: '',

        company: '',
        role: null,
        division: null,

        scholarity: '',
        gender: '',
        marital: '',

        cep: '',
        street: '',
        district: '',
        city: '',
        house_number: '',
        complement: '',
        references: '',

        created_at: '',
        updated_at: '',


    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (form.cep && (form.cep.length == 9)) {
                const cepReplaced = form.cep.replace('-', '');
                const { data } = await QueryCEP(cepReplaced);
                if (!data.erro) {
                    // enqueueSnackbar('CEP encontrado com sucesso!', { variant: 'info', position: 'top-right' });
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

    const handleOpen = async () => {
        try {
            enqueueSnackbar('Carregando Informações, por favor aguarde!', { variant: 'info', position: 'top-right' });
            setOpen(true);
            setLoading(true);
            const { data, status } = await FindWorker(id);
            if (status === 'success') {

                setForm({
                    name: data.full_name,
                    email: data.email,
                    born_at: data.born_at,

                    cpf: data.cpf,
                    ctps: data.ctps,
                    pis: data.pis,

                    company: data.company,
                    role: data.role,
                    division: data.division,

                    scholarity: data.education_level,
                    gender: data.gender,
                    marital: data.marital_status,

                    vacations: data.vacations,
                    benefits: data.benefits,
                    incidents: data.incidents,
                    gratifications: data.gratifications,

                    phone: data.phone.phone_number,

                    cep: data.address.CEP,
                    street: data.address.street,
                    district: data.address.district,
                    city: data.address.city,
                    house_number: data.address.house_number,
                    complement: data.address.complement,
                    references: data.address.references,

                    condition: data.delete_at ? 'Demitido' : 'Ativo',
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    demoted_at: data.deleted_at ? data.delete_at : '---'
                })
                setLoading(false);

            }

        } catch (error) {

        }

    }

    const saveForm = async () => {
        try {
            const { status } = await UpdateWorker(id, form);
            if (status === 'success') {
                enqueueSnackbar('Funcionário atualizado com sucesso!', { variant: 'success', position: 'top-right' });
                setError("");

                setRefreshState(!refreshState);
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Verifique os erros do formulário!', { variant: 'error', position: 'top-right' });
            const path = error.response?.data.errors;
            setError(path);
        }

    }


    return (
        <div>
            <IconButton onClick={handleOpen}
                sx={{
                    backgroundColor: 'info.main',
                    color: "#fff",
                    borderRadius: '25%',
                    "&:hover": { backgroundColor: "info.main" }
                }}
                size='small'>
                <Visibility />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {!isLoading ?
                    <Box sx={large}>
                        <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                            <Typography variant="title" component="h4">
                                Ver Detalhes - {isDisabled ? '[MODO VISUALIZAÇÃO]' : '[MODO EDIÇÃO]'}
                            </Typography>
                            <IconButton onClick={handleClose} sx={{ p: 0 }}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle" component="h2" sx={{ mb: 2 }}>
                                Dados Básicos
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Nome" variant="outlined" value={form.name} InputProps={{ readOnly: isDisabled }} onChange={e => { setForm({ ...form, name: e.target.value }) }} error={!!(error?.name)} helperText={error?.name} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Email" variant="outlined" value={form.email} InputProps={{ readOnly: isDisabled }} onChange={e => { setForm({ ...form, email: e.target.value }) }} error={!!(error?.email)} helperText={error?.email} />
                                </Grid>
                                <Grid item xs={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                        <DatePicker label="Data de Nascimento" variant="outlined" format="dd/MM/yyyy"
                                            disableFuture
                                            value={parse(form.born_at, 'y-M-d', new Date())}
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    born_at: e,
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
                                <Grid item xs={4}>
                                    <Autocomplete
                                        fullWidth
                                        options={list_gender}
                                        sx={{ maxWidth: 500, display: 'inline-block' }}
                                        value={form.gender}
                                        readOnly={isDisabled}
                                        onChange={(e, value) => {
                                            setForm({
                                                ...form,
                                                gender: value.label,
                                            });
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Gênero" />}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Autocomplete
                                        fullWidth
                                        options={list_marital_status}
                                        sx={{ maxWidth: 500, display: 'inline-block' }}
                                        value={form.marital}
                                        readOnly={isDisabled}
                                        onChange={(e, value) => {
                                            setForm({
                                                ...form,
                                                marital: value.label,
                                            });
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Autocomplete
                                        fullWidth
                                        options={list_scholarity}
                                        sx={{ maxWidth: 500, display: 'inline-block' }}
                                        value={form.scholarity}
                                        readOnly={isDisabled}
                                        onChange={(e, value) => {
                                            setForm({
                                                ...form,
                                                scholarity: value.label,
                                            });
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Escolaridade" />}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <ReactInputMask
                                        mask="(99) 99999-9999"
                                        value={form.phone}
                                        onChange={e => {
                                            setForm({
                                                ...form,
                                                phone: e.target.value,
                                            });
                                        }}
                                    >
                                        {() => <TextField
                                            fullWidth
                                            label={"Telefone / Celular"}
                                            variant="outlined" required error={!!(error?.phones?.phone_number)} helperText={error.phones?.phone_number} />}
                                    </ReactInputMask>
                                </Grid>
                                <Grid item xs={4}>
                                    <Autocomplete
                                        fullWidth
                                        options={roles}
                                        sx={{ display: 'inline-block' }}
                                        getOptionLabel={option => option.name}
                                        value={form.role}
                                        readOnly={isDisabled}
                                        onChange={(e, value) => {
                                            setForm({
                                                ...form,
                                                role: value,
                                            });
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Função" required error={!!(error?.role)} helperText={error?.role} />}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Autocomplete
                                        fullWidth
                                        options={divisions}
                                        getOptionLabel={option => option.name}
                                        sx={{ display: 'inline-block' }}
                                        value={form.division}
                                        readOnly={isDisabled}
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
                            <Box sx={{ width: '100%', mt: 3, borderTop: 1, borderColor: '#eaedf2' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                    sx={{ justifyContent: 'center' }}>
                                    <Tab value="0" label="Endereço" />
                                    <Tab value="1" label="Documentos" />
                                    <Tab value="2" label="Admissão & Demissão" />
                                    <Tab value="3" label="Benefícios" />
                                    <Tab value="4" label="Incidentes" />
                                    <Tab value="5" label="Gratificações" />
                                    <Tab value="6" label="Férias" />
                                </Tabs>
                            </Box>
                            {value === '0' &&
                                <Box sx={{ mt: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
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
                                        <Grid item xs={8} />
                                        <Grid item xs={4}>
                                            <TextField fullWidth label="Rua" variant="filled" value={form.street} InputProps={{ readOnly: true }} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth label="Bairro" variant="filled" value={form.district} InputProps={{ readOnly: true }} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth label="Cidade / UF" variant="filled" value={form.city} InputProps={{ readOnly: true }} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth label="Nº da Casa" variant="outlined" value={form.house_number} InputProps={{ readOnly: isDisabled }} onChange={e => { setForm({ ...form, house_number: e.target.value }) }} error={!!(error?.house_number)} helperText={error?.house_number} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth label="Complemento" variant="outlined" value={form.complement} InputProps={{ readOnly: isDisabled }} onChange={e => { setForm({ ...form, complement: e.target.value }) }} error={!!(error?.complement)} helperText={error?.complement} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth label="Referências" variant="outlined" value={form.references} InputProps={{ readOnly: isDisabled }} onChange={e => { setForm({ ...form, references: e.target.value }) }} error={!!(error?.references)} helperText={error?.references} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            }
                            {value === '1' &&
                                <Box sx={{ mt: 2 }}>
                                    <Grid container spacing={2}>
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
                                            </ReactInputMask>                                        </Grid>
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
                                            </ReactInputMask>                                        </Grid>
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
                                            </ReactInputMask>                                        </Grid>
                                    </Grid>
                                </Box>
                            }
                            {value === '2' &&
                                <Box sx={{ mt: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField fullWidth label="Condição" variant="standard" value={form.condition} InputProps={{ readOnly: true }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField fullWidth label="Ultima Atualização" variant="standard" value={form.updated_at} InputProps={{ readOnly: true }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField fullWidth label="Admissão" variant="standard" value={form.created_at} InputProps={{ readOnly: true }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField fullWidth label="Demissão" variant="standard" value={form.demoted_at} InputProps={{ readOnly: true }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            }
                            {value === '3' &&
                                <Box sx={{ mt: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#f5f8fb' }}>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Id
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Tipo
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Descrição
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Bonus
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {form.benefits.length > 0 ?
                                            <TableBody>
                                                {form.benefits.map((data) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            key='beneficio'
                                                        //
                                                        >
                                                            <TableCell>
                                                                <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                                                                    {data.id}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    BENEFÍCIO
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    {data.benefits_type.name}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography color={'success.dark'} sx={{ fontWeight: 600 }}>
                                                                    R$ {data.benefits_type.bonus}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                            :
                                            <TableBody>
                                                <TableCell colSpan={7}>
                                                    <Box sx={{ justifyContent: 'center' }}>
                                                        <Typography variant='subtitle'><ErrorOutline sx={{ verticalAlign: 'bottom' }} /> Não há benefícios cadastrados.</Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableBody>
                                        }

                                    </Table>
                                </Box>
                            }
                            {value === '4' &&
                                <Box sx={{ mt: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#f5f8fb' }}>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Id
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Tipo
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Descrição
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Bonus
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {form.incidents.length > 0 ?
                                            <TableBody>
                                                {form.incidents.map((data) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            key='incidentes'
                                                        //
                                                        >
                                                            <TableCell>
                                                                <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                                                                    {data.id}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    INCIDENTES
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    {data.incident_reason}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography color={'success.dark'} sx={{ fontWeight: 600 }}>
                                                                    R$ {data.discounted_amount}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                            :
                                            <TableBody>
                                                <TableCell colSpan={7}>
                                                    <Box sx={{ justifyContent: 'center' }}>
                                                        <Typography variant='subtitle'><ErrorOutline sx={{ verticalAlign: 'bottom' }} /> Não há incidentes cadastrados.</Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableBody>
                                        }

                                    </Table>
                                </Box>
                            }
                            {value === '5' &&
                                <Box sx={{ mt: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#f5f8fb' }}>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Id
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Tipo
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Descrição
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Bonus
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {form.gratifications.length > 0 ?
                                            <TableBody>
                                                {form.gratifications.map((data) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            key='gratificações'
                                                        >
                                                            <TableCell>
                                                                <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                                                                    {data.id}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    GRATIFICAÇÕES
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    {data.gratification_reason}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography color={'success.dark'} sx={{ fontWeight: 600 }}>
                                                                    R$ {data.bonus}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                            :
                                            <TableBody>
                                                <TableCell colSpan={7}>
                                                    <Box sx={{ justifyContent: 'center' }}>
                                                        <Typography variant='subtitle'><ErrorOutline sx={{ verticalAlign: 'bottom' }} /> Não há gratificações cadastrados.</Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableBody>
                                        }

                                    </Table>
                                </Box>
                            }
                            {value === '6' &&
                                <Box sx={{ mt: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#f5f8fb' }}>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Id
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Tipo
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Data Inicio - Data Fim
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Adicional Férias
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 650 }}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {form.vacations.length > 0 ?
                                            <TableBody>
                                                {form.vacations.map((data) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            key='ferias'
                                                        //
                                                        >
                                                            <TableCell>
                                                                <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                                                                    {data.id}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    FÉRIAS
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ fontWeight: 500 }}>
                                                                    {data.start_date} - {data.end_date}
                                                                </Typography>
                                                            </TableCell>

                                                            <TableCell>
                                                                <Typography color={'success.dark'} sx={{ fontWeight: 600 }}>
                                                                    R$ {data.bonus}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                            :
                                            <TableBody>
                                                <TableCell colSpan={7}>
                                                    <Box sx={{ justifyContent: 'center' }}>
                                                        <Typography variant='subtitle'><ErrorOutline sx={{ verticalAlign: 'bottom' }} /> Não há férias cadastrados.</Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableBody>
                                        }

                                    </Table>
                                </Box>
                            }
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2, justifyContent: 'right', display: 'flex' }}>
                            {isDisabled ?
                                <>
                                    <IconButton onClick={handleEdit}
                                        sx={{
                                            backgroundColor: 'info.main',
                                            color: "#fff",
                                            borderRadius: '25%',
                                            "&:hover": { backgroundColor: "info.main" },
                                            mr: 1,
                                        }}
                                        size='small'
                                    >
                                        <Edit />
                                    </IconButton>

                                </>
                                :
                                <>
                                    <IconButton onClick={handleEdit}
                                        sx={{
                                            backgroundColor: 'info.main',
                                            color: "#fff",
                                            borderRadius: '25%',
                                            "&:hover": { backgroundColor: "info.main" },
                                            mr: 1,
                                        }}
                                        size='small'
                                    >
                                        <Edit />
                                    </IconButton>

                                    <IconButton
                                        onClick={saveForm}
                                        sx={{
                                            backgroundColor: 'success.main',
                                            color: "#fff",
                                            borderRadius: '25%',
                                            "&:hover": { backgroundColor: "success.main" }
                                        }}
                                        size='small'>
                                        <Done />
                                    </IconButton>
                                </>
                            }

                        </Box>
                    </Box>

                    :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress color='error' />
                    </div>

                }
            </Modal>
        </div >
    );
}

export const DeleteModal = ({ id, refreshState, setRefreshState }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteForm = async () => {
        try {
            const { status } = await DeleteWorker(id);
            if (status === 'success') {
                refreshState = setRefreshState(!refreshState);
                enqueueSnackbar('Funcionário deletado com sucesso!', { variant: 'success', position: 'top-right' });
                setError("");
            }
        } catch (error) {
            enqueueSnackbar('Verifique os erros!', { variant: 'error', position: 'top-right' });
            const path = error.response?.data.errors;
            setError(path);
        }

    }

    return (
        <div>
            <IconButton variant={'outlined'} onClick={handleOpen}
                sx={{
                    backgroundColor: 'error.main',
                    color: "#fff",
                    borderRadius: '25%',
                    "&:hover": { backgroundColor: "error.main" },
                    ml: 1
                }}
                size='small'>

                <Delete />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ borderRadius: '20px' }}
            >
                <Box sx={small}>
                    <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant="title" component="h4" >
                            Remover Dados
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ p: 0 }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2, size: '300%', justifyContent: 'center', textAlign: 'center' }}>
                        <Delete sx={{ color: 'error.main', height: '120px', width: '120px' }} />
                        <Typography variant="h5" component="h4">Você tem certeza?</Typography>
                        <Typography variant="subtitle1" component="h2" sx={{ mt: 3 }}>Você realmente deseja deletar esses dados?</Typography>
                        <Typography variant="subtitle1" component="h4">Esse processo não pode ser desfeito.</Typography>
                        <Divider sx={{ m: 2 }} />
                        <Box sx={{ justifyContent: 'right', display: 'flex' }}>
                            <Button onClick={handleClose} variant="contained" startIcon={<Close />} sx={{ mr: 1, backgroundColor: 'neutral.700', "&:hover": { backgroundColor: "neutral.800" } }}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color='error' onClick={deleteForm} startIcon={<Delete />} >
                                Deletar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
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