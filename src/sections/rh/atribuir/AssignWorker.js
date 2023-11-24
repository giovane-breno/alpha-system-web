import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
    ArrowRight,
    ChevronRight,
    FilterList,
    MoreHoriz,
    StayPrimaryLandscape,
} from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from '@mui/x-date-pickers/locales';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    Collapse,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SvgIcon,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";
import { FetchBenefits, FetchWorkers } from "src/services/WorkersService";
import { CheckExistingCompany } from "src/services/CompaniesService";
import { CreateBenefit, CreateGratification, CreateIncident, CreateVacation } from "src/services/HumanResourceService";
import { enqueueSnackbar } from "notistack";

export const AssignWorker = () => {
    useEffect(() => {
        setFormHeader({
            ...formHeader,
            company: CheckExistingCompany(),
        });
    }, []);

    const [formHeader, setFormHeader] = useState({
        company: null,
        worker: null,
        option: null,
    });

    const { data: workersArray } = FetchWorkers(formHeader.company);
    const { data: benefitsArray } = FetchBenefits(formHeader.company);

    const [formIncident, setFormIncident] = useState({
        reason: '',
        discount: '',
        start_date: '',
        end_date: '',

    });

    const [error, setError] = useState();

    const [formGratification, setFormGratification] = useState({
        reason: '',
        bonification: '',
        start_date: '',
        end_date: '',
    });

    const [formBenefit, setFormBenefit] = useState({
        benefit: null,
    });

    const [formVacation, setFormVacation] = useState({
        start_date: '',
        end_date: '',
    });

    let status;
    const saveForm = async () => {
        try {
            switch (formHeader.option?.id) {

                // { id: 1, label: "Incidente" },
                case 1:
                    ({ status } = await CreateIncident(formHeader, formIncident));
                    if (status === 'success') {
                        enqueueSnackbar('Incidente cadastrado com sucesso!', { variant: 'success', position: 'top-right' });
                        setFormHeader({
                            ...formHeader,
                            worker: null,
                            option: null,
                        });

                        setFormIncident({
                            reason: '',
                            discount: '',
                            start_date: '',
                            end_date: '',
                        })
                    }
                    break;

                // { id: 2, label: "Gratificação" },
                case 2:
                    ({ status } = await CreateGratification(formHeader, formGratification));
                    if (status === 'success') {
                        enqueueSnackbar('Gratificação cadastrado com sucesso!', { variant: 'success', position: 'top-right' });
                        setFormHeader({
                            ...formHeader,
                            worker: null,
                            option: null,
                        });

                        setFormGratification({
                            reason: '',
                            bonification: '',
                            start_date: '',
                            end_date: '',
                        })
                    }
                    break;

                // { id: 3, label: "Benefício" },
                case 3:
                    ({ status } = await CreateBenefit(formHeader, formBenefit));
                    if (status === 'success') {
                        enqueueSnackbar('Benefício cadastrado com sucesso!', { variant: 'success', position: 'top-right' });
                        setFormHeader({
                            ...formHeader,
                            worker: null,
                            option: null,
                        });

                        setFormBenefit({
                            benefit: null,
                        })
                    }
                    break;

                // { id: 4, label: "Férias" },
                case 4:
                    ({ status } = await CreateVacation(formHeader, formVacation));
                    if (status === 'success') {
                        enqueueSnackbar('Férias cadastrada com sucesso!', { variant: 'success', position: 'top-right' });
                        setFormHeader({
                            ...formHeader,
                            worker: null,
                            option: null,
                        });

                        setFormVacation({
                            start_date: '',
                            end_date: '',
                        })
                    }
                    break;
            }
        } catch (error) {
            enqueueSnackbar('Verifique os erros do formulário!', { variant: 'error', position: 'top-right' });
            const path = error.response?.data.errors;
            setError(path);
        }
    }

    return (
        <Card>
            <Box item xs={8} sx={{ p: 2, textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle">Atribuições</Typography>
                </Box>
                <Box sx={{ pb: 3 }}>
                    <TextField fullWidth InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 500, display: "inline-block" }}
                        id="outlined-basic" label="Empresa Vinculada *" variant="filled"
                        value={formHeader.company && formHeader.company.name}
                        error={!!(!formHeader.company)}
                        helperText={!formHeader.company && "Necessário selecionar uma empresa!"}
                    />
                </Box>
                {formHeader.company &&
                    <Box sx={{ pb: 3 }}>
                        <Autocomplete
                            fullWidth
                            sx={{ maxWidth: 500, display: "inline-block" }}
                            options={workersArray}
                            getOptionLabel={option => option.full_name}
                            value={formHeader.worker}
                            onChange={(e, value) => {
                                setFormHeader({
                                    ...formHeader,
                                    worker: value,
                                });
                            }}
                            renderInput={(params) => <TextField {...params} label="Funcionário" required />}
                        />
                    </Box>

                }
                <Collapse in={!!formHeader.worker}>
                    <Box sx={{ pb: 4 }}>
                        <Autocomplete
                            fullWidth
                            options={assignTypes}
                            sx={{ maxWidth: 500, display: "inline-block" }}
                            value={formHeader.option}
                            onChange={(e, value) => {
                                setFormHeader({
                                    ...formHeader,
                                    option: value,
                                });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tipo de Atribuição"
                                />
                            )}
                        />
                    </Box>

                </Collapse>
                <Collapse in={!!formHeader.option}>
                    <Divider sx={{ mb: 1 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle">Dados para Inserção</Typography>
                    </Box>
                    {formHeader.option && formHeader.option.id == 1 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic" variant="outlined" label="Razão do Incidente"
                                    value={formIncident.reason} onChange={e => { setFormIncident({ ...formIncident, reason: e.target.value }) }}
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic" variant="outlined" label="Desconto Salárial"
                                    value={formIncident.discount} onChange={e => { setFormIncident({ ...formIncident, discount: e.target.value }) }}
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Início do Desconto" variant="outlined" format="dd/MM/yyyy"
                                        disablePast
                                        value={formIncident.start_date}
                                        onChange={(e) => {
                                            setFormIncident({
                                                ...formIncident,
                                                start_date: e,
                                            });
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: 'true',
                                                required: 'true',
                                                error: false
                                            },
                                        }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Fim do Desconto" variant="outlined" format="dd/MM/yyyy"
                                        disablePast
                                        value={formIncident.end_date}
                                        onChange={(e) => {
                                            setFormIncident({
                                                ...formIncident,
                                                end_date: e,
                                            });
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: 'true',
                                                required: 'true',
                                                error: false

                                            },
                                        }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>

                            
                        </>
                    }
                    {formHeader.option && formHeader.option.id == 2 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic" variant="outlined" label="Motivo da Gratificação"
                                    value={formGratification.reason} onChange={e => { setFormGratification({ ...formGratification, reason: e.target.value }) }}
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic" variant="outlined" label="Acréscimo Salárial"
                                    value={formGratification.bonification} onChange={e => { setFormGratification({ ...formGratification, bonification: e.target.value }) }}
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Início da Gratificação" variant="outlined" format="dd/MM/yyyy"
                                        disablePast
                                        value={formGratification.start_date}
                                        onChange={(e) => {
                                            setFormGratification({
                                                ...formGratification,
                                                start_date: e,
                                            });
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: 'true',
                                                required: 'true',
                                                error: false

                                            },
                                        }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Fim da Gratificação" variant="outlined" format="dd/MM/yyyy"
                                        disablePast

                                        value={formGratification.end_date}
                                        onChange={(e) => {
                                            setFormGratification({
                                                ...formGratification,
                                                end_date: e,
                                            });
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: 'true',
                                                required: 'true',
                                                error: false

                                            },
                                        }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>

                            
                        </>
                    }
                    {formHeader.option && formHeader.option.id == 3 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <Autocomplete
                                    fullWidth
                                    options={benefitsArray}
                                    sx={{ maxWidth: 500, display: "inline-block" }}
                                    getOptionLabel={option => option.name}
                                    value={formBenefit.benefit}
                                    onChange={(e, value) => {
                                        setFormBenefit({
                                            ...formBenefit,
                                            benefit: value,
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Benefício a Adicionar"
                                        />
                                    )}
                                />
                            </Box>

                            
                        </>
                    }
                    {formHeader.option && formHeader.option.id == 4 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Início das Férias" variant="outlined" format="dd/MM/yyyy"
                                        disablePast
                                        value={formVacation.start_date}
                                        onChange={(e) => {
                                            setFormVacation({
                                                ...formVacation,
                                                start_date: e,
                                            });
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: 'true',
                                                required: 'true',
                                                error: false

                                            },
                                        }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Fim das Férias" variant="outlined" format="dd/MM/yyyy"
                                        disablePast
                                        value={formVacation.end_date}
                                        onChange={(e) => {
                                            setFormVacation({
                                                ...formVacation,
                                                end_date: e,
                                            });
                                        }}

                                        slotProps={{
                                            textField: {
                                                fullWidth: 'true',
                                                required: 'true',
                                                error: false

                                            },
                                        }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                        </>
                    }

                    <Button variant="contained" color="warning" onClick={saveForm} sx={{ maxWidth: 500, width: 500 }}>
                        Inserir
                    </Button>
                </Collapse>
            </Box >
        </Card >
    );
};

const months = [
    { label: "Janeiro" },
    { label: "Fevereiro" },
    { label: "Março" },
    { label: "Abril" },
    { label: "Maio" },
    { label: "Junho" },
    { label: "Julho" },
    { label: "Agosto" },
    { label: "Setembro" },
    { label: "Outubro" },
    { label: "Novembro" },
    { label: "Dezembro" },
];

const assignTypes = [
    { id: 1, label: "Incidente" },
    { id: 2, label: "Gratificação" },
    { id: 3, label: "Benefício" },
    { id: 4, label: "Férias" },
];