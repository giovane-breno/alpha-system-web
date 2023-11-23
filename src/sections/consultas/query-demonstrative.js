import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
    ArrowRight,
    ChevronRight,
    ErrorOutline,
    FilterList,
    MoreHoriz,
    StayPrimaryLandscape,
} from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    Collapse,
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
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";
import { CheckExistingCompany } from "src/services/CompaniesService";
import { getWorkerDemonstrative } from "src/services/FinanceService";
import { FetchWorkers } from "src/services/WorkersService";
import { Demonstrative } from "./demonstrative";

export const QueryDemonstrative = ({ userData, abilities }) => {
    useEffect(() => {
        setFormHeader({
            ...formHeader,
            company: CheckExistingCompany(),
        });
    }, []);

    const [demonstratives, setDemonstratives] = useState(null);
    const [formHeader, setFormHeader] = useState({
        company: null,
        worker: null,
        month: null,
        option: null,
    });

    const [formDemonstrative, setFormDemonstrative] = useState({
        company: {
            name: formHeader.company?.name,
            address: '',
            cnpj: formHeader.company?.cnpj
        },
        competence: '',

        worker: {
            id: '',
            name: '',
            role: '',
            division: '',
        },

        data: {
            id: '',
            type: '',
            amount: '',
            discount: '',
        },

        total: {
            sumAmount: 0,
            sumDiscount: 0,
            receiveAmount: 0,
        }


    });

    const { data: workersArray } = FetchWorkers(formHeader.company);

    const [tab, setTab] = useState("0");
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleDemonstrative = (company, companyAddress, competence, worker, data, total) => e => {
        setFormDemonstrative({
            ...formDemonstrative,
            company: {
                name: company?.name,
                address: 'teste',
                cnpj: company?.CNPJ,
                address: companyAddress?.street + ", " + companyAddress?.district + ", " + companyAddress?.house_number
            },

            competence: competence,

            worker: {
                id: worker.id,
                name: worker.name,
                role: worker.role,
                division: worker.division,
            },

            data: {
                base_salary: data.base_salary,
                bonus: data.bonus,
                benefits: data.benefits,
                vacation: data.vacation,
                incident: data.incident,
            },

            total: {
                sumAmount: total.gross_salary,
                sumDiscount: total.discounts,
                receiveAmount: total.net_salary,
            }

        })
    }

    const getDemonstrative = async () => {
        try {
            let data;
            let status;
            if (abilities === '') {
                ({ data, status } = await getWorkerDemonstrative(userData.id, formHeader.month?.id));

            } else {
                ({ data, status } = await getWorkerDemonstrative(formHeader.worker?.id, formHeader.month?.id));
            }
            if (status === 'success') {
                if (data[0]) {
                    setDemonstratives(data);
                    setTab("1");

                    enqueueSnackbar(`Demonstrativo encontrado com sucesso!`, { variant: 'success', position: 'top-right' });

                    setFormHeader({
                        ...formHeader,
                        worker: null,
                        month: null
                    })

                    setFormDemonstrative({
                        ...formDemonstrative,
                        competence: '',
                    });

                } else {
                    enqueueSnackbar(`Não foram encontrados Demonstrativos da competência selecionada.`, { variant: 'error', position: 'top-right' });
                }


            }
        } catch (error) {
            enqueueSnackbar("Houve um erro ao buscar o demonstrativo.", { variant: 'error', position: 'top-right' });

        }
    };

    return (
        <Card>
            <Box sx={{ width: "100%" }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="0" label="Consultar" />
                    <Tab value="1" label="Demonstrativos Encontrados" disabled={!!(!demonstratives)} />
                </Tabs>
            </Box>
            {tab === "0" && (
                <Box item xs={8} sx={{ p: 2, textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle">Consultar Demonstrativos</Typography>
                    </Box>
                    <Box sx={{ pb: 3 }}>
                        <TextField fullWidth InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 500, display: "inline-block" }}
                            id="outlined-basic" label="Empresa Vinculada *" variant="filled"
                            value={formHeader.company && formHeader.company.name}
                            error={!!(!formHeader.company)}
                            helperText={!formHeader.company && "Necessário selecionar uma empresa!"}
                        />
                    </Box>
                    {formHeader.company && formHeader.company.id > 0 &&
                        <Box sx={{ pb: 3 }}>
                            {abilities === '' ?
                                <>
                                    <TextField fullWidth InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 500, display: "inline-block" }}
                                        id="outlined-basic" label="Funcionário *" variant="filled"
                                        value={userData.name}
                                    />
                                </>
                                :
                                <Autocomplete
                                    fullWidth
                                    options={workersArray}
                                    getOptionLabel={option => option.full_name}
                                    value={formHeader.worker}
                                    onChange={(e, value) => {
                                        setFormHeader({
                                            ...formHeader,
                                            worker: value,
                                        });
                                    }}
                                    sx={{ maxWidth: 500, display: "inline-block" }}
                                    renderInput={(params) => <TextField {...params} label="Funcionário *" />}
                                />
                            }

                        </Box>
                    }
                    <Collapse in={!!formHeader.worker || abilities === ''}>
                        <Box sx={{ pb: 4 }}>
                            <Autocomplete
                                fullWidth
                                options={months}
                                sx={{ maxWidth: 500, display: "inline-block" }}
                                getOptionLabel={option => option.label}
                                value={formHeader.month}
                                onChange={(e, value) => {
                                    setFormHeader({
                                        ...formHeader,
                                        month: value,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Competência"
                                        helperText="Mantenha em Branco para gerar todos os meses."
                                    />
                                )}
                            />
                        </Box>
                    </Collapse>
                    <Box>
                        <Button variant="contained" onClick={getDemonstrative} color="warning" disabled={(!formHeader.company || !formHeader.worker) && abilities !== ''}
                            sx={{ maxWidth: 500, width: 500 }}>
                            Consultar
                        </Button>
                    </Box>
                </Box>
            )}

            {tab === "1" && (
                <Grid container spacing={2} p={2}>
                    <Grid item md={5} borderRight={1} borderColor={'#F2F4F7'}>
                        <Box sx={{ textAlign: "center" }}>
                            <Scrollbar>
                                <Box>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Competência</TableCell>
                                                <TableCell>Visualizar</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ borderRight: "primary.dark" }}>
                                            {demonstratives[0] ?

                                                demonstratives.map((data) => {
                                                    return (
                                                        <TableRow hover key={data.id}>
                                                            <TableCell>
                                                                <Typography
                                                                    variant="subtitle3"
                                                                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                                                                >
                                                                    #{data.id}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>{data.competence}</TableCell>
                                                            <TableCell>
                                                                <IconButton onClick={handleDemonstrative(data.company, data.company_address, data.competence, data.worker, data.data, data.total)}>
                                                                    <ChevronRight />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                                :
                                                <TableCell colSpan={3}>
                                                    <Box sx={{ justifyContent: 'center' }}>
                                                        <Typography variant='subtitle'><ErrorOutline sx={{ verticalAlign: 'bottom' }} /> Não há dados nessa tabela.</Typography>
                                                    </Box>
                                                </TableCell>
                                            }

                                        </TableBody>
                                    </Table>
                                </Box>
                            </Scrollbar>
                        </Box>
                        {/* <TablePagination
                        // labelDisplayedRows={
                        //     ({ from, page, count }) => {
                        //         return 'Mostrando ' + from + ' de ' + count + ' itens | Página ' + (page + 1)
                        //     }
                        // }
                        // rowsPerPageOptions={-1}
                        // component="div"
                        // shape="rounded"
                        // count={count}
                        // onPageChange={onPageChange}
                        // page={page}
                        // rowsPerPage={rowsPerPage}
                        // onRowsPerPageChange={onRowsPerPageChange}
                        /> */}
                    </Grid>
                    <Grid item md={7} borderRight={1} borderColor={'#F2F4F7'} sx={{ mt: 'auto', mb: 'auto' }}>
                        {formDemonstrative.competence ?
                            <Demonstrative formDemonstrative={formDemonstrative} />
                            :
                            <>
                                <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                                    <Typography variant='subtitle'><ErrorOutline sx={{ verticalAlign: 'bottom' }} /> Clique em visualizar para acessar um demonstrativo.</Typography>

                                </Box>
                            </>
                        }
                    </Grid>
                </Grid>
            )
            }
        </Card >
    );
};

const months = [
    { id: 1, label: "Janeiro" },
    { id: 2, label: "Fevereiro" },
    { id: 3, label: "Março" },
    { id: 4, label: "Abril" },
    { id: 5, label: "Maio" },
    { id: 6, label: "Junho" },
    { id: 7, label: "Julho" },
    { id: 8, label: "Agosto" },
    { id: 9, label: "Setembro" },
    { id: 10, label: "Outubro" },
    { id: 11, label: "Novembro" },
    { id: 12, label: "Dezembro" },
];