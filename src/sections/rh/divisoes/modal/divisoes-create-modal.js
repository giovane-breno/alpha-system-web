import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, ExpandLess, ExpandMore, Info, MoreVert, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { CreateDivision } from 'src/services/HumanResourceService';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

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

export const CreateModal = ({ refreshState, setRefreshState }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [form, setForm] = useState({
        name: '',
        bonus: '',
    });

    const saveForm = async () => {
        try {
            const { status } = await CreateDivision(form);
            if (status === 'success') {
                enqueueSnackbar('Tipo de benefício cadastrado com sucesso!', { variant: 'success', position: 'top-right' });

                setError("");
                setForm({
                    name: '',
                    bonus: '',
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
                Cadastrar Divisão
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
                            Cadastrar Função
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ p: 0 }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                            Dados da Divisão
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Nome" type="text" variant="outlined" required value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }) }} error={!!(error?.name)} helperText={error?.name} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Bonus" type="number" variant="outlined" required value={form.bonus} onChange={e => { setForm({ ...form, bonus: e.target.value }) }} error={!!(error?.bonus)} helperText={error?.bonus} />
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