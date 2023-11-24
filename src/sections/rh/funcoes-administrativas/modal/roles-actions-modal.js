import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, ExpandLess, ExpandMore, Info, MoreVert, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

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

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 }
];

const data = [
    {
        type: 'Benefício',
        description: 'Vale-Alimentação',
        amount: '500,00',
    },
    {
        type: 'Benefício',
        description: 'Vale-Transporte',
        amount: '234,00',
    }
];

export const ViewModal = ({id, refreshState, setRefreshState}) => {
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
                <Box sx={small}>
                    <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant="h6" component="h4" >
                             Ver Detalhes - {!isDisabled && '[MODO EDIÇÃO]'}
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
                                <TextField fullWidth label="Nome" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Salário Base" variant="outlined" />
                            </Grid>
                        </Grid>
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton variant={'outlined'} onClick={handleOpen}
                sx={{
                    backgroundColor: 'error.main',
                    color: "#fff",
                    borderRadius: '25%',
                    "&:hover": { backgroundColor: "error.main" },
                    mr: 1
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