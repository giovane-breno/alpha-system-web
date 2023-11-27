import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Checkbox, Chip, CircularProgress, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, ListSubheader, Menu, MenuItem, OutlinedInput, Select, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, ExpandLess, ExpandMore, Info, MoreVert, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { DeleteAdminRole, FindAdminRole, UpdateAdminRole } from 'src/services/HumanResourceService';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export const ViewModal = ({ id, refreshState, setRefreshState }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isDisabled, setDisabled] = useState(true);
    const [error, setError] = useState();
    const handleClose = () => {
        setOpen(false);
        setDisabled(true);
    }

    const handleEdit = () => setDisabled(!isDisabled);

    const [form, setForm] = useState({
        name: '',
        abilities: [],
    });

    const handleOpen = async () => {
        try {
            enqueueSnackbar('Carregando Informações, por favor aguarde!', { variant: 'info', position: 'top-right' });
            setOpen(true);
            setLoading(true);
            const { data, status } = await FindAdminRole(id);
            if (status === 'success') {
                let updatedAbilities = JSON.parse(data.abilities).map(value => {
                    let found = abilities.find(item => item.value === value);
                    return {
                        category: found ? found.category : null, // Adiciona a propriedade category
                        value,
                        name: found ? found.name : value, // Se não encontrou, mantém o valor original

                    };
                });

                setForm({
                    name: data.name,
                    abilities: updatedAbilities,
                })

                console.log(form.abilities.indexOf(abilities) > -1);


                console.log(updatedAbilities);
                setLoading(false);
            }

        } catch (error) {

        }
    }

    const saveForm = async () => {
        try {
            const { status } = await UpdateAdminRole(id, form);
            if (status === 'success') {
                enqueueSnackbar('Função Administrativa atualizada com sucesso!', { variant: 'success', position: 'top-right' });
                handleClose();

                setError("");
                setForm({
                    name: '',
                    abilities: [],
                });

                setRefreshState(!refreshState);
            }
        } catch (error) {
            enqueueSnackbar('Verifique os erros do formulário!', { variant: 'error', position: 'top-right' });
            const path = error.response?.data.errors;
            setError(path);
        }

    }

    const handleSelect = (event) => {
        const {
            target: { value },
        } = event;

        setForm({
            ...form,
            abilities: value,
        });
    };

    let lastCategory = null;

    return (
        <div>
            <IconButton onClick={handleOpen}
                sx={{
                    backgroundColor: 'info.main',
                    color: "#fff",
                    borderRadius: '25%',
                    "&:hover": { backgroundColor: "info.main" },
                    mr: 1
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
                    <Box sx={small}>
                        <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                            <Typography variant="h6" component="h4" >
                                Ver Detalhes {!isDisabled && '[MODO EDIÇÃO]'}
                            </Typography>
                            <IconButton onClick={handleClose} sx={{ p: 0 }}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                                Dados da Função Administrativa
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth  InputProps={{ readOnly: isDisabled }} label="Função" type="text" variant="outlined" required value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }) }} error={!!(error?.name)} helperText={error?.name} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                        <InputLabel>Permissões</InputLabel>
                                        <Select
                                            multiple
                                            value={form.abilities}
                                            onChange={handleSelect}
                                            input={<OutlinedInput label="Permissões" />}
                                            readOnly={isDisabled}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value.value} label={value.name} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {abilities.map((data) => {

                                                if (data.category !== lastCategory) {
                                                    lastCategory = data.category;
                                                    return (
                                                        <ListSubheader key={data.category}>{data.category}</ListSubheader>
                                                    );
                                                }

                                                return (
                                                    <MenuItem key={data.value} value={data}>

                                                        <Checkbox checked={form.abilities.findIndex(item => item.value === data.value) !== -1} />
                                                        <ListItemText primary={data.name} />
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
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
            const { status } = await DeleteAdminRole(id);
            if (status === 'success') {
                refreshState = setRefreshState(!refreshState);
                enqueueSnackbar('Incidente removido com sucesso!', { variant: 'success', position: 'top-right' });
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

const abilities = [
    { category: 'Básico', value: null, name: null },
    { category: 'Básico', value: 'isAdmin', name: 'Funções Básicas de Adminstrador' },
    { category: 'Básico', value: 'isOperator', name: 'Funções Básicas do Operador' },
    { category: 'Financeiro', value: null, name: null },
    { category: 'Financeiro', value: 'doPayment', name: 'Realizar o Pagamento' },
    { category: 'Financeiro', value: 'deletePayroll', name: 'Deletar Holerite' },
    { category: 'Cadastro', value: null, name: null },
    { category: 'Cadastro', value: 'createCompany', name: 'Cadastrar Empresa' },
    { category: 'Cadastro', value: 'createUser', name: 'Cadastrar Funcionário' },
    { category: 'Cadastro', value: 'createDivision', name: 'Cadastrar Divisão' },
    { category: 'Cadastro', value: 'createRole', name: 'Cadastrar Função' },
    { category: 'Cadastro', value: 'createBenefit', name: 'Cadastrar Benefício' },
    { category: 'Cadastro', value: 'createAdminRole', name: 'Cadastrar Função Administrativa' },
    { category: 'Cadastro', value: 'createIncident', name: 'Cadastrar Incidente' },
    { category: 'Cadastro', value: 'createVacation', name: 'Cadastrar Férias' },
    { category: 'Cadastro', value: 'createGratification', name: 'Cadastrar Gratificação' },
    { category: 'Administrativo', value: null, name: null },
    { category: 'Administrativo', value: 'promoteAdmin', name: 'Adicionar Usuários Administradores' },
    { category: 'Administrativo', value: 'demoteAdmin', name: 'Remover Usuários Administradores' },
    { category: 'Administrativo', value: 'updateUser', name: 'Editar Funcionário' },
    { category: 'Administrativo', value: 'deleteUser', name: 'Deletar Funcionário' },
    { category: 'Edição', value: null, name: null },
    { category: 'Edição', value: 'updateDivision', name: 'Editar Divisão' },
    { category: 'Edição', value: 'updateAdminRole', name: 'Editar Função Administrativa' },
    { category: 'Edição', value: 'updateCompany', name: 'Editar Empresa' },
    { category: 'Edição', value: 'updateRole', name: 'Atualizar Função' },
    { category: 'Edição', value: 'updateGratification', name: 'Editar Gratificação' },
    { category: 'Edição', value: 'updateVacation', name: 'Editar Férias' },
    { category: 'Edição', value: 'updateBenefit', name: 'Editar Benefício' },
    { category: 'Edição', value: 'updateIncident', name: 'Editar Incidente' },
    { category: 'Deletar', value: null, name: null },
    { category: 'Deletar', value: 'deleteDivision', name: 'Deletar Divisão' },
    { category: 'Deletar', value: 'deleteRole', name: 'Deletar Função' },
    { category: 'Deletar', value: 'deleteAdminRole', name: 'Deletar Função Administrativa' },
    { category: 'Deletar', value: 'deleteCompany', name: 'Deletar Empresa' },
    { category: 'Deletar', value: 'deleteVacation', name: 'Deletar Férias' },
    { category: 'Deletar', value: 'deleteGratification', name: 'Deletar Gratificação' },
    { category: 'Deletar', value: 'deleteIncident', name: 'Deletar Incidente' },
    { category: 'Deletar', value: 'deleteBenefit', name: 'Deletar Benefício' },
];