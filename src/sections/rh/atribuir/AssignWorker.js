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

export const AssignWorker = () => {
    useEffect(() => {
        CheckExistingCompany();
    }, []);

    const [value, setValue] = useState("0");
    const [worker, setWorker] = useState("");
    const [benefit, setBenefit] = useState("");
    const [assign, setAssign] = useState("");
    const [company, setCompany] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const CheckExistingCompany = () => {
        let company = localStorage.getItem(('company-data'));
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
                    <Tab value="0" label="Atribuir" />
                </Tabs>
            </Box>

            <Box item xs={8} sx={{ p: 2, textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle">Atribuições</Typography>
                </Box>
                <Box sx={{ pb: 3 }}>
                    <TextField fullWidth InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} sx={{ maxWidth: 500, display: "inline-block" }}
                        id="outlined-basic" label="Empresa Vinculada *" variant="filled"
                        value={company && company.name}
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
                            options={assignTypes}
                            sx={{ maxWidth: 500, display: "inline-block" }}
                            value={assign}
                            onChange={(event, newValue) => {
                                setAssign(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tipo de Atribuição"
                                />
                            )}
                        />
                    </Box>
                </Collapse>                    <Collapse in={!!assign}>


                    <Divider sx={{ mb: 1 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle">Dados para Inserção</Typography>
                    </Box>
                    {assign && assign.id == 1 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic"variant="outlined" label="Razão do Incidente"
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic"variant="outlined" label="Desconto Salárial"
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Início do Desconto" variant="outlined" slotProps={{
                                        textField: {
                                            fullWidth: 'true',
                                            required: 'true',
                                        },
                                    }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Fim do Desconto" variant="outlined" slotProps={{
                                        textField: {
                                            fullWidth: 'true',
                                            required: 'true',
                                        },
                                    }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                        </>
                    }
                    {assign && assign.id == 2 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic"variant="outlined" label="Motivo da Gratificação"
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <TextField fullWidth sx={{ maxWidth: 500, display: "inline-block" }}
                                    id="outlined-basic"variant="outlined" label="Acréscimo Salárial"
                                />
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Início da Gratificação" variant="outlined" slotProps={{
                                        textField: {
                                            fullWidth: 'true',
                                            required: 'true',
                                        },
                                    }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Fim da Gratificação" variant="outlined" slotProps={{
                                        textField: {
                                            fullWidth: 'true',
                                            required: 'true',
                                        },
                                    }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                        </>
                    }
                    {assign && assign.id == 3 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <Autocomplete
                                    fullWidth
                                    options={benefits}
                                    sx={{ maxWidth: 500, display: "inline-block" }}
                                    value={benefit}
                                    onChange={(event, newValue) => {
                                        setBenefit(newValue);
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
                    {assign && assign.id == 4 &&
                        <>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Início das Férias" variant="outlined" slotProps={{
                                        textField: {
                                            fullWidth: 'true',
                                            required: 'true',
                                        },
                                    }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker label="Data de Fim das Férias" variant="outlined" slotProps={{
                                        textField: {
                                            fullWidth: 'true',
                                            required: 'true',
                                        },
                                    }} sx={{ maxWidth: 500 }} />
                                </LocalizationProvider>
                            </Box>
                        </>
                    }
                </Collapse>

                <Box>
                    <Button variant="contained" color="warning" disabled={!!(!company)} sx={{ maxWidth: 500, width: 500 }}>
                        Inserir
                    </Button>
                </Box>
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

const benefits = [
    {id: 1, label: "Vale-Transporte"},
    {id: 2, label: "Vale-Alimentação"},
];

const assignTypes = [
    { id: 1, label: "Incidente" },
    { id: 2, label: "Gratificação" },
    { id: 3, label: "Benefício" },
    { id: 4, label: "Férias" },
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
