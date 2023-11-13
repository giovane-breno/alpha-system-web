import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, Snackbar, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@mui/material';
import { CheckCircle, Close, Delete, Done, Edit, Info, Remove, UnfoldMore, Visibility } from '@mui/icons-material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import { useEffect, useState } from 'react';
import { FetchCompanies, FindActiveCustomer } from 'src/services/CompaniesService';
import Toast from 'src/components/toast';

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



export const CompanyModal = () => {
    useEffect(() => {
        CheckExistingCompany();
    }, []);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('0');
    const [company, setCompany] = useState('Nenhuma Empresa Selecionada');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data: companiesArray, isLoading: customersLoading } = FetchCompanies();

    const CheckExistingCompany = () => {
        let company = localStorage.getItem(('company-data'));
        setCompany(JSON.parse(company));
    }

    const UpdateCompany = (company) => {
        setCompany(company);
        saveDataInCache(company);
        handleClose();
        window.location.reload();
    };

    const saveDataInCache = (data) => {
        localStorage.setItem('company-data', JSON.stringify(data));
    }

    return (
        <div>
            <Box onClick={handleOpen}
                sx={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    p: '12px'
                }}
            >
                <div>
                    <Typography
                        color="inherit"
                        variant="subtitle1"
                    >
                        {(company) ?
                            (company.name)
                            :
                            "Nenhuma Empresa Selecionada"
                        }
                    </Typography>
                    <Typography
                        color="neutral.400"
                        variant="body2"
                    >
                        {(company) &&
                            (company.cnpj)
                        }

                    </Typography>
                </div>
                <IconButton
                    sx={{
                        color: "#fff",
                        borderRadius: '25%',
                        "&:hover": { backgroundColor: "info.main" }
                    }}
                    size='small'>
                    <UnfoldMore />
                </IconButton>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                keepMounted
            >
                <Box sx={small}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="title" component="h2" sx={{ mb: 2 }}>
                            Selecionar Empresa
                        </Typography>
                        <Autocomplete
                            fullWidth
                            options={companiesArray}
                            getOptionLabel={option => option.name}

                            value={company}
                            onChange={(event, newValue) => {
                                UpdateCompany(newValue);
                            }}
                            sx={{ maxWidth: 500, display: 'inline-block' }}
                            renderInput={(params) => <TextField {...params} label="Razão Social" />}
                        />
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}