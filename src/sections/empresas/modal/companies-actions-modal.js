import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, Info, Remove, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { DeleteCompanies, DeleteCompany } from 'src/services/CompaniesService';
import { enqueueSnackbar } from 'notistack';

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

// Verificar se é um dispositivo móvel e ajustar a largura
// if (window.innerWidth <= 768) { // Você pode ajustar a largura de que considera como "móvel" (768 é um valor comum)
//     large.width = '100%';
//     small.width = '100%';
// }


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 }
];

export const ViewModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Box sx={large}>
                    <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant="h6" component="h4" >
                            Ver Detalhes
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
                                <TextField fullWidth label="Razão Social" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Nome Fantasia" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="CNPJ" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ maxWidth: 500, display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Estado de Registro" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ maxWidth: 500, display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Cidade de Registro" />}
                                />
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 3 }} />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                                Endereço da Empresa
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="CEP" variant="outlined" helperText="Preencha um CEP válido para busca de dados." />
                                </Grid>
                                <Grid item xs={8} />
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Rua" variant="filled" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Bairro" variant="filled" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Cidade / UF" variant="filled" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Nº da Casa" variant="outlined" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Complemento" variant="outlined" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Referências" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2, justifyContent: 'right', display: 'flex' }}>
                        <IconButton onClick={handleOpen}
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
                        <IconButton onClick={handleOpen}
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

export const DeleteModal = ({ id, refreshState, setRefreshState }) => {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
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
            const path = error.response.data.errors;
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