import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
    ArrowRight,
    ChevronRight,
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

export const QueryDemonstrative = () => {
    useEffect(() => {
        setFormHeader({
            ...formHeader,
            company: CheckExistingCompany(),
        });
    }, []);

    const [demonstratives, setDemonstratives] = useState({});
    const [formHeader, setFormHeader] = useState({
        company: null,
        worker: null,
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
            const { data, status } = await getWorkerDemonstrative(formHeader.worker?.id);
            if (status === 'success') {
                setDemonstratives(data);
                enqueueSnackbar(`Demonstrativo de ${formHeader.worker.full_name} encontrados com sucesso!`, { variant: 'success', position: 'top-right' });

                // if (formHeader.worker?.id) {
                // } else {
                //     enqueueSnackbar('Demonstrativos gerados com sucesso!', { variant: 'success', position: 'top-right' });

                //     data?.generated > 0 &&
                //         enqueueSnackbar(`${data?.generated} holerites foram gerados!`, { variant: 'info', position: 'top-right' });

                //     data?.not_generated > 0 &&
                //         enqueueSnackbar(`${data?.not_generated} holerites não foram gerados!`, { variant: 'warning', position: 'top-right' });

                // }

                setFormHeader({
                    ...formHeader,
                    worker: null,
                })

            }
        } catch (error) {
            // if (formHeader.worker?.id) {
            //     enqueueSnackbar(`O funcionário selecionado já possui o holerite desse mês.`, { variant: 'error', position: 'top-right' });
            // } else {
            //     enqueueSnackbar('Houve um erro ao gerar holerites.', { variant: 'error', position: 'top-right' });
            // }
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
                    <Tab value="1" label="Demonstrativos Encontrados" />
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
                        </Box>
                    }
                    <Collapse in={!!formHeader.worker}>
                        <Box sx={{ pb: 4 }}>
                            <Autocomplete
                                fullWidth
                                options={months}
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
                                        label="Competência"
                                        helperText="Mantenha em Branco para gerar todos os meses."
                                    />
                                )}
                            />
                        </Box>
                    </Collapse>
                    <Box>
                        <Button variant="contained" onClick={getDemonstrative} color="warning" disabled={(!!(!formHeader.company) || !!(!formHeader.worker))} sx={{ maxWidth: 500, width: 500 }}>
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
                                            {demonstratives.map((data) => {
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
                                            })}
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
                    <Demonstrative formDemonstrative={formDemonstrative} />
                </Grid>
            )
            }
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