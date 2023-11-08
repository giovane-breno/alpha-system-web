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
import { useEffect, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";

export const QueryDemonstrative = () => {
    useEffect(() => {
        CheckExistingCompany();
    }, []);

    const [value, setValue] = useState("0");
    const [worker, setWorker] = useState("");
    const [company, setCompany] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const CheckExistingCompany = () => {
        let company = sessionStorage.getItem(('company-data'));
        setCompany(JSON.parse(company));
    }

    return (
        <Card>
            <Box sx={{ width: "100%" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="0" label="Consultar" />
                    <Tab value="1" label="Demonstrativos Encontrados" />
                </Tabs>
            </Box>
            {value === "0" && (
                <Box item xs={8} sx={{ p: 2, textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle">Consultar Demonstrativos</Typography>
                    </Box>
                    <Box sx={{ pb: 3 }}>
                        <TextField fullWidth InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 500, display: "inline-block" }}
                            id="outlined-basic" label="Empresa Vinculada *" variant="filled"
                            value={company && company.label}
                            error={!!(!company)}
                            helperText={!company && "Necessário selecionar uma empresa!"}
                        />
                    </Box>
                    {company &&
                        <Box sx={{ pb: 3 }}>
                            <Autocomplete
                                fullWidth
                                options={top100Films}
                                value={worker}
                                onChange={(event, newValue) => {
                                    setWorker(newValue);
                                }}
                                sx={{ maxWidth: 500, display: "inline-block" }}
                                renderInput={(params) => <TextField {...params} label="Funcionário *" />}
                            />
                        </Box>
                    }
                    <Collapse in={!!worker}>
                        <Box sx={{ pb: 4 }}>
                            <Autocomplete
                                fullWidth
                                options={months}
                                sx={{ maxWidth: 500, display: "inline-block" }}
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
                        <Button variant="contained" color="warning" disabled={!!(!company)} sx={{ maxWidth: 500, width: 500 }}>
                            Consultar
                        </Button>
                    </Box>
                </Box>
            )}

            {value === "1" && (
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
                                            <TableRow hover key={"13"}>
                                                <TableCell>
                                                    <Typography
                                                        variant="subtitle3"
                                                        sx={{ fontWeight: "bold", color: "secondary.main" }}
                                                    >
                                                        #33
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>Outubro/2023</TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <ChevronRight />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Scrollbar>
                        </Box>
                    </Grid>
                    <Grid item md={7} height={600} sx={{ pt: '0' }}>
                        <Typography variant="title">Demonstrativo Gerado</Typography>

                        <Scrollbar>
                            <Grid container sx={{ border: 2, borderColor: "black", mb: 2, p: 2 }}>
                                <Grid item md={6}>
                                    <Box>
                                        <Typography variant="subtitle">Empregador</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle">Nome</Typography>  <Typography variant="title">ALPHA SYSTEM</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle">Endereço</Typography>   <Typography variant="title">Rua das Cornelias</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle">CNPJ</Typography>  <Typography variant="title">12.345.678/9101-12</Typography>
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
                                        <Typography variant="title">JANEIRO/2023</Typography>
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
                                                        00001
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ border: 0, p: 0 }}>
                                                    <Typography variant="subtitle" sx={{ fontWeight: 800, fontSize: 15, color: "black" }}>
                                                        Edivirges da Silva Sauro{" "}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ border: 0, p: 0 }}>
                                                    <Typography variant="subtitle" sx={{ fontWeight: 800, fontSize: 15, color: "black" }}>
                                                        Analista de Sistemas
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ border: 0, p: 0 }}>
                                                    <Typography variant="subtitle" sx={{ fontWeight: 800, fontSize: 15, color: "black" }}>
                                                        Tecnologia da Informação
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
                                                <TableCell align="center" sx={{ p: 0, border: 1, borderColor: 'black' }}>
                                                    CÓD.
                                                </TableCell>
                                                <TableCell align="center" sx={{ p: 0, border: 1, borderColor: 'black' }}>
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
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        00001
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        Salario Base
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        R$ 5.000,00
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
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        00002
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        FÉRIAS
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        R$ 2.150,00
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
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        00001
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>
                                                    <Typography variant="subtitle" sx={{ fontSize: 15, color: "black" }}>
                                                        Ocorrências
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
                                                    >R$ 1.000,00</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={"13"}>
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>

                                                </TableCell>
                                                <TableCell sx={{ pt: 0, borderLeft: 1, borderRight: 1, borderBottom: 0, borderColor: 'black' }}>

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
                                                        <Typography variant="subtitle">R$ 1000.00</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ pt: 0, border: 1, borderColor: 'black' }}>
                                                    <Box align="right">
                                                        <Typography variant="subtitle">Total Descontos</Typography>
                                                    </Box>
                                                    <Box align="right">
                                                        <Typography variant="subtitle">R$ 0.00</Typography>
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
                                                    <Typography variant="title">R$ 1.500,00</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Scrollbar>
                    </Grid>
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

const months2 = [
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

const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
        label: "The Lord of the Rings: The Return of the King",
        year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
        label: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
    },
    {
        label: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
        label: "The Lord of the Rings: The Two Towers",
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
        label: "Star Wars: Episode IV - A New Hope",
        year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
        label: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
        label: "Star Wars: Episode VI - Return of the Jedi",
        year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
        label: "Eternal Sunshine of the Spotless Mind",
        year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
];
