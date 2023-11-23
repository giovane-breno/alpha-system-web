import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, CircularProgress, Divider, Grid, IconButton, InputAdornment, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, Info, Remove, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { DeleteCompanies, DeleteCompany, FindCompany, QueryCEP, UpdateCompany } from 'src/services/CompaniesService';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FetchDivisions, FetchRoles } from 'src/services/WorkersService';
import ReactInputMask from 'react-input-mask';

const large = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    borderRadius: '.3rem',
    boxShadow: 24,
};

const small = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    bgcolor: 'background.paper',
    borderRadius: '.3rem',
    boxShadow: 24,
};


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 }
];

export const ViewModal = ({ id, refreshState, setRefreshState }) => {
    const handleClose = () => {
        setOpen(false);
        setDisabled(true);
    };

    const handleEdit = () => setDisabled(!isDisabled);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isDisabled, setDisabled] = useState(true);
    const [form, setForm] = useState({
        name: '',
        corporate_name: '',
        CNPJ: '',
        town_registration: '',
        state_registration: '',

        cep: '',
        street: '',
        district: '',
        city: '',
        house_number: '',
        complement: '',
        references: '',
    });

    const handleOpen = async () => {
        try {
            enqueueSnackbar('Carregando Informações, por favor aguarde!', { variant: 'info', position: 'top-right' });
            setOpen(true);
            setLoading(true);
            const { data, status } = await FindCompany(id);
            if (status === 'success') {
                setForm({
                    name: data.name,
                    corporate_name: data.corporate_name,
                    CNPJ: data.CNPJ,
                    town_registration: data.town_registration,
                    state_registration: data.state_registration,

                    cep: data.address.CEP,
                    street: data.address.street,
                    district: data.address.district,
                    city: data.address.city,
                    house_number: data.address.house_number,
                    complement: data.address.complement,
                    references: data.address.references,
                })
                setLoading(false);

            }

        } catch (error) {

        }
    }

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

    const saveForm = async () => {
        try {
            const { status } = await UpdateCompany(id, form);
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
                            <Typography variant="h6" component="h4" >
                                Ver Detalhes - {isDisabled ? '[MODO VISUALIZAÇÃO]' : '[MODO EDIÇÃO]'}
                            </Typography>
                            <IconButton onClick={handleClose} sx={{ p: 0 }}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                                Dados Corporativos
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Nome Fantasia" variant="outlined" value={form.name} InputProps={{ readOnly: isDisabled }} onChange={e => { setForm({ ...form, name: e.target.value }) }} error={!!(error?.name)} helperText={error?.name} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Razão Social" variant="outlined" value={form.corporate_name} InputProps={{ readOnly: isDisabled }} onChange={e => { setForm({ ...form, corporate_name: e.target.value }) }} error={!!(error?.corporate_name)} helperText={error?.corporate_name} />
                                </Grid>
                                <Grid item xs={4}>
                                    <ReactInputMask
                                        mask="99.999.999/0001-99"
                                        value={form.CNPJ}
                                        onChange={e => {
                                            setForm({
                                                ...form,
                                                CNPJ: e.target.value,
                                            });
                                        }}
                                        readOnly={isDisabled}
                                    >
                                        {() => <TextField fullWidth label="CNPJ" variant="outlined" required error={!!(error?.CNPJ)} helperText={error?.CNPJ} />}
                                    </ReactInputMask>
                                </Grid>
                                <Grid item xs={4}>
                                    <ReactInputMask
                                        mask="999.999.999.999"
                                        value={form.state_registration}
                                        onChange={e => {
                                            setForm({
                                                ...form,
                                                state_registration: e.target.value,
                                            });
                                        }}

                                        readOnly={isDisabled}
                                    >
                                        {() => <TextField fullWidth label="Inscrição Estadual" variant="outlined" required error={!!(error?.state_registration)} helperText={error?.state_registration} />}
                                    </ReactInputMask>
                                </Grid>
                                <Grid item xs={4}>
                                    <ReactInputMask
                                        mask="999.999.999.999"
                                        value={form.town_registration}
                                        onChange={e => {
                                            setForm({
                                                ...form,
                                                town_registration: e.target.value,
                                            });
                                        }}
                                        readOnly={isDisabled}
                                    >
                                        {() => <TextField fullWidth label="Inscrição Municipal" variant="outlined" required error={!!(error?.town_registration)} helperText={error?.town_registration} />}
                                    </ReactInputMask>
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: 3 }} />
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                                    Endereço da Empresa
                                </Typography>
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
            const { status } = await DeleteCompany(id);
            if (status === 'success') {
                refreshState = setRefreshState(!refreshState);
                enqueueSnackbar('Empresa deletada com sucesso!', { variant: 'success', position: 'top-right' });
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
                        <Typography variant="h6" component="h4" >
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
        </div >
    );
}