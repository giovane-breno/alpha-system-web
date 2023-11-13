import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { Close, Delete, Done, Edit, Info, Visibility } from '@mui/icons-material';
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

export const ViewModal = ({customer}) => {
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
                        <Typography variant="title" component="h4">
                            Ver Detalhes
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
                                <TextField fullWidth label="Nome" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Email" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Data de Nascimento" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ maxWidth: 500, display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Gênero" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ maxWidth: 500, display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    fullWidth
                                    options={top100Films}
                                    sx={{ maxWidth: 500, display: 'inline-block' }}
                                    renderInput={(params) => <TextField {...params} label="Escolaridade" />}
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
                        }
                        {value === '1' &&
                            <Box sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="CPF" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="CTPS" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="PIS" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                        {value === '2' &&
                            <Box sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Condição" variant="standard" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Ultima Atualização" variant="standard" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Admissão" variant="standard" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Demissão" variant="standard" />
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
                                                Fechamento
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((customer) => {
                                            // const isSelected = selected.includes(customer.id);
                                            // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');


                                            return (
                                                <TableRow
                                                    hover
                                                    key={customer.type}
                                                //
                                                >
                                                    <TableCell>
                                                        <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                                                            #0003
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography sx={{ fontWeight: 500 }}>
                                                            {customer.type}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography sx={{ fontWeight: 500 }}>
                                                            {customer.description}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography color={'success.dark'} sx={{ fontWeight: 600 }}>
                                                            R$ {customer.amount}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        }
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

export const DeleteModal = () => {
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