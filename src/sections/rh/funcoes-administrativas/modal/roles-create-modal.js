import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, ListSubheader, Menu, MenuItem, OutlinedInput, Select, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, ExpandLess, ExpandMore, Info, MoreVert, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useState } from 'react';
import { CreateAdminRole } from 'src/services/HumanResourceService';
import { enqueueSnackbar } from 'notistack';

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

export const CreateModal = ({ refreshState, setRefreshState }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: '',
        abilities: [],
    });

    const saveForm = async () => {
        try {
            const { status } = await CreateAdminRole(form);
            if (status === 'success') {
                enqueueSnackbar('Função de Administrador cadastrado com sucesso!', { variant: 'success', position: 'top-right' });
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
            <Button
                onClick={handleOpen}
                color='success'
                startIcon={(
                    <SvgIcon fontSize="small">
                        <PlusIcon />
                    </SvgIcon>
                )}
                variant="contained"
            >
                Cadastrar Função
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={small}>
                    <Box sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant="h6" component="h4" >
                            Cadastrar Função Administrativa
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ p: 0 }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                            Dados da Função
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Nome" type="text" variant="outlined" required value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }) }} error={!!(error?.name)} helperText={error?.name} />
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                            Permissões
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel>Permissões</InputLabel>
                                    <Select
                                        multiple
                                        value={form.abilities}
                                        onChange={handleSelect}
                                        input={<OutlinedInput label="Permissões" />}
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
                                                    <Checkbox checked={form.abilities.indexOf(data) > -1} />
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
                        <IconButton onClick={saveForm}
                            sx={{
                                backgroundColor: 'success.main',
                                color: "#fff",
                                borderRadius: '25%',
                                "&:hover": { backgroundColor: "success.main" }
                            }}
                            size='small'>
                            <Done />
                        </IconButton>
                    </Box>
                </Box>
            </Modal>
        </div >
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
    { category: 'Deletar', value: 'deleteDivision', name: 'Deletar Divisão' },
    { category: 'Deletar', value: null, name: null },
    { category: 'Deletar', value: 'deleteRole', name: 'Deletar Função' },
    { category: 'Deletar', value: 'deleteAdminRole', name: 'Deletar Função Administrativa' },
    { category: 'Deletar', value: 'deleteCompany', name: 'Deletar Empresa' },
    { category: 'Deletar', value: 'deleteVacation', name: 'Deletar Férias' },
    { category: 'Deletar', value: 'deleteGratification', name: 'Deletar Gratificação' },
    { category: 'Deletar', value: 'deleteIncident', name: 'Deletar Incidente' },
    { category: 'Deletar', value: 'deleteBenefit', name: 'Deletar Benefício' },
];