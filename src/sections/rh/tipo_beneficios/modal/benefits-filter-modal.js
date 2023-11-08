import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { AutoFixHigh, CheckCircle, Close, Delete, Done, Edit, FilterList, Info, Remove, Visibility } from '@mui/icons-material';
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

const normal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%', // Largura padrão
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


export const FilterModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <FilterList sx={{
                    height: "32px",
                    width: '32px'
                }} />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={normal}>
                    <Box id="modal-modal-title" sx={{ borderBottom: 1, p: 2, borderColor: '#eaedf2', justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant="title" component="h6" color={'background.main'} >
                            Filtros
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ p: 0 }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle" component="h4" sx={{ mb: 2 }}>
                            Ordenação
                        </Typography>
                        <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Ordem" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Campo Ordenador" />}
                                />
                            </Grid>
                            {/* <Grid item xs={4}>
                                <TextField fullWidth label="Razão Social" variant="outlined" />
                            </Grid> */}
                        </Grid>
                        <Divider sx={{ m: 2 }} />
                        <Box sx={{ justifyContent: 'right', display: 'flex' }}>
                            <Button onClick={handleClose} variant="contained" startIcon={<AutoFixHigh />} sx={{ mr: 1, backgroundColor: 'neutral.700', "&:hover": { backgroundColor: "neutral.800" } }}>
                                Limpar Filtros
                            </Button>
                            <Button variant="contained" color='info' startIcon={<CheckCircle />} >
                                Aplicar Filtros
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}