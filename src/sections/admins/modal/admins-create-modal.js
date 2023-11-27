import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, ExpandLess, ExpandMore, Info, MoreVert, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { CreateAdmin, CreateDivision } from 'src/services/HumanResourceService';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { FetchAdminRoles, FetchWorkers } from 'src/services/WorkersService';

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

export const CreateModal = ({ refreshState, setRefreshState, company }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data: roles, isLoading: rolesLoading } = FetchAdminRoles();
    const { data: workers, isLoading: workersLoading } = FetchWorkers(company);


    const [form, setForm] = useState({
        user_id: null,
        admin_role_id: null,
    });

    const saveForm = async () => {
        try {
            const { status } = await CreateAdmin(form);
            if (status === 'success') {
                enqueueSnackbar('Administrador cadastrado com sucesso!', { variant: 'success', position: 'top-right' });

                setError("");
                setForm({
                    user_id: '',
                    admin_role_id: '',
                });

                setRefreshState(!refreshState);

                handleClose();

            }
        } catch (error) {
            enqueueSnackbar('Verifique os erros do formulário!', { variant: 'error', position: 'top-right' });
            const path = error.response?.data.errors;
            setError(path);
        }

    }

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
                Cadastrar Administrador
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={small}>
                    <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant="h6" component="h4" >
                            Cadastrar Administrador
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ p: 0 }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                            Dados do Administrador
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={workers}
                                    sx={{ display: 'inline-block' }}
                                    getOptionLabel={option => option.full_name}
                                    value={form.user_id}
                                    onChange={(e, value) => {
                                        setForm({
                                            ...form,
                                            user_id: value,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Funcionários" required error={!!(error?.role)} helperText={error?.role} />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={roles}
                                    sx={{ display: 'inline-block' }}
                                    getOptionLabel={option => option.name}
                                    value={form.admin_role_id}
                                    onChange={(e, value) => {
                                        setForm({
                                            ...form,
                                            admin_role_id: value,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Funções Administrativas" required error={!!(error?.role)} helperText={error?.role} />}
                                />
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