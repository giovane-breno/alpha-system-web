import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
    ArrowRight,
    ChevronRight,
    FilterList,
    MoreHoriz,
    Print,
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
    Stack,
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
import { useEffect, useRef, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";
import { CheckExistingCompany } from "src/services/CompaniesService";
import { getWorkerDemonstrative } from "src/services/FinanceService";
import { FetchWorkers } from "src/services/WorkersService";
import ReactToPrint, { PrintContextConsumer, useReactToPrint } from 'react-to-print';


export const Demonstrative = ({ formDemonstrative }) => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <Grid item md={12} height={600} sx={{ pt: '0' }} ref={componentRef}>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
            >
                <Typography variant="title">Demonstrativo Gerado</Typography>
                <div>
                    <IconButton sx={{ float: "right" }} onClick={handlePrint}>
                        <Print />
                    </IconButton>
                </div>
            </Stack>


            <Scrollbar sx={{ mt: 2 }}>
                <Grid container sx={{ border: 2, borderColor: "black", mb: 2, p: 2 }}>
                    <Grid item md={6}>
                        <Box>
                            <Typography variant="subtitle">Empregador</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle">Nome</Typography>  <Typography variant="title">{formDemonstrative.company.name}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle">Endereço</Typography>   <Typography variant="title">{formDemonstrative.company.address}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle">CNPJ</Typography>  <Typography variant="title">{formDemonstrative.company.cnpj}</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={6} textAlign={"right"}>
                        <Box>
                            <Typography variant="title">Demonstrativo de Pagamento de Salário</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle">Referente ao mes/ano</Typography>
                        </Box>
                        <Box>
                            <Typography variant="title">{formDemonstrative.competence}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container border={2} borderColor={'black'} mb={2}>
                    <Grid item md={12}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: 0, p: 0 }} >Código </TableCell>
                                    <TableCell sx={{ border: 0, p: 0 }} >Nome do Funcionário </TableCell>
                                    <TableCell sx={{ border: 0, p: 0 }} >Função</TableCell>
                                    <TableCell sx={{ border: 0, p: 0 }} >Divisão</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow hover key={"13"}>
                                    <TableCell sx={{ border: 0, p: 0 }}>
                                        <Typography variant="subtitle" sx={{ fontWeight: 800, fontSize: 15, color: "black" }}>
                                            {formDemonstrative.worker.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 0, p: 0 }}>
                                        <Typography variant="subtitle" sx={{ fontWeight: 800, fontSize: 15, color: "black" }}>
                                            {formDemonstrative.worker.name}{" "}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 0, p: 0 }}>
                                        <Typography variant="subtitle" sx={{ fontWeight: 800, fontSize: 15, color: "black" }}>
                                            {formDemonstrative.worker.role}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 0, p: 0 }}>
                                        <Typography variant="subtitle" sx={{ fontWeight: 800, fontSize: 15, color: "black" }}>
                                            {formDemonstrative.worker.division}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={12}>
                        <Table size="small" >
                            <TableHead>
                                <TableRow>

                                    <TableCell colSpan={2} align="center" sx={{ p: 0, border: 1, borderColor: 'black' }}>
                                        Descrição
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 0, border: 1, borderColor: 'black' }}>
                                        Proventos
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 0, border: 1, borderColor: 'black' }}>
                                        Descontos
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody align={'center'} sx={{ verticalAlign: 'middle' }}>
                                <TableRow hover key={"13"}>
                                    <TableCell colSpan={2} sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            Salario Base
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            R$ {formDemonstrative.data.base_salary}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography
                                            variant="subtitle"
                                            sx={{ fontSize: 15, color: "black" }}
                                        >R$ 0.00</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover key={"13"}>
                                    <TableCell colSpan={2} sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography colSpan={2} variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            Bonificações
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            R$ {formDemonstrative.data.bonus}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography
                                            variant="subtitle"
                                            sx={{ fontSize: 15, color: "black" }}
                                        >R$ 0.00</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover key={"13"}>
                                    <TableCell colSpan={2} sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            Benefícios
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            R$ {formDemonstrative.data.benefits}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography
                                            variant="subtitle"
                                            sx={{ fontSize: 15, color: "black" }}
                                        >R$ 0.00</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover key={"13"}>
                                    <TableCell colSpan={2} sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            FÉRIAS
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            R$ {formDemonstrative.data.vacation}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography
                                            variant="subtitle"
                                            sx={{ fontSize: 15, color: "black" }}
                                        >R$ 0.00</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover key={"13"}>
                                    <TableCell colSpan={2} sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            Incidentes
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                            R$ 0.00
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                        <Typography
                                            variant="subtitle"
                                            sx={{ fontSize: 15, color: "black" }}
                                        >R$ {formDemonstrative.total.sumDiscount}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={"13"}>
                                    <TableCell colSpan={2} sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>

                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>

                                    </TableCell>
                                    <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ pt: 0, border: 1, borderBottom: 0, borderColor: 'black' }} />
                                    <TableCell sx={{ pt: 0, border: 1, borderColor: 'black' }}>
                                        <Box align="right">
                                            <Typography variant="subtitle">Total Vencimentos</Typography>
                                        </Box>
                                        <Box align="right">
                                            <Typography variant="subtitle">R$ {formDemonstrative.total.sumAmount}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, border: 1, borderColor: 'black' }}>
                                        <Box align="right">
                                            <Typography variant="subtitle">Total Descontos</Typography>
                                        </Box>
                                        <Box align="right">
                                            <Typography variant="subtitle">R$ {formDemonstrative.total.sumDiscount}</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ pt: 0, border: 1, borderBottom: 1, borderTop: 0, borderColor: 'black' }} />
                                    <TableCell sx={{ pt: 0, border: 1, borderColor: 'black' }}>
                                        <Box align="right">
                                            <Typography variant="subtitle">Total a Receber</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ pt: 0, border: 1, borderColor: 'black' }}>
                                        <Typography variant="title">R$ {formDemonstrative.total.receiveAmount}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Scrollbar>
        </Grid>
    );
}
