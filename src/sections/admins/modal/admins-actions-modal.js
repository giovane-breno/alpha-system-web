import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, CircularProgress, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, ExpandLess, ExpandMore, Info, MoreVert, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { useState } from 'react';
import { DeleteAdmin, FindAdmin, FindAdminRole, UpdateAdmin, UpdateAdminRole } from 'src/services/HumanResourceService';
import { enqueueSnackbar } from 'notistack';
import { FetchAdminRoles, FetchRoles } from 'src/services/WorkersService';

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


export const MenuButton = () => {
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
        <div>
            <IconButton sx={{
                backgroundColor: 'grey',
                color: "#fff",
                borderRadius: '25%',
                "&:hover": { backgroundColor: "grey" },
                ml: 1
            }}
                size='small'
                aria-label="more"
                id="long-button"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem><PromoteModal /></MenuItem>
                <MenuItem><DemoteModal /></MenuItem>
            </Menu>

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
                            <Button variant="contained" color='error' startIcon={<Delete />} >
                                Deletar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export const ViewModal = ({ id, refreshState, setRefreshState }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isDisabled, setDisabled] = useState(true);
    const [error, setError] = useState();
    const { data: roles, isLoading: rolesLoading } = FetchAdminRoles();

    const handleClose = () => {
        setOpen(false);
        setDisabled(true);
    }

    const handleEdit = () => setDisabled(!isDisabled);

    const [form, setForm] = useState({
        name: '',
        role: '',
        created_at: '',
    });

    const handleOpen = async () => {
        try {
            enqueueSnackbar('Carregando Informações, por favor aguarde!', { variant: 'info', position: 'top-right' });
            setOpen(true);
            setLoading(true);
            const { data, status } = await FindAdmin(id);
            console.log(data);
            if (status === 'success') {
                setForm({
                    user_id: data.user.id,
                    name: data.user.full_name,
                    role: data.role,
                    created_at: data.created_at,
                })
                setLoading(false);
            }

        } catch (error) {

        }
    }

    const saveForm = async () => {
        try {
            const { status } = await UpdateAdmin(id, form);
            if (status === 'success') {
                enqueueSnackbar('Administrador atualizado com sucesso!', { variant: 'success', position: 'top-right' });
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
                    <Box sx={small}>
                        <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                            <Typography variant="title" component="h4">
                                Ver Detalhes
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
                                    <TextField fullWidth label="Nome" variant="outlined" value={form.name} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Ultima promoção" variant="outlined" value={form.created_at} InputProps={{ readOnly: true }} />
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
            const { status } = await DeleteAdmin(id);
            if (status === 'success') {
                refreshState = setRefreshState(!refreshState);
                enqueueSnackbar('Administrador removido com sucesso!', { variant: 'success', position: 'top-right' });
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