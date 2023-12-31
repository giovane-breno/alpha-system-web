import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Divider,
  Breadcrumbs,
  Link,
  Tooltip,
  IconButton
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/empresas/companies-table';
import { CompaniesSearch } from 'src/sections/empresas/companies-search';
import { RhCard } from 'src/sections/rh/rh-card';
import { RhSearch } from 'src/sections/rh/rh-search';
import { RhTable } from 'src/sections/rh/rh-table';
import { AccountBalance, BeachAccess, CardGiftcard, Home, Info, LibraryAdd, ManageAccounts, NavigateNext, People, Person, PlusOne, Report } from '@mui/icons-material';

// Beneficios
// Divisões
// Gratificações
// Incidentes
// Funções
// férias
const data = [
  {
    id: 1,
    url: 'rh/funcoes-administrativas',
    title: 'Funções Administrativas',
    description: 'Cadastro e Consulta de Funções',
    icon: <ManageAccounts color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    id: 2,
    url: 'rh/funcoes',
    title: 'Funções',
    description: 'Cadastro e Consulta de Funções',
    icon: <Person color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    id: 3,
    url: 'rh/divisoes',
    title: 'Divisões',
    description: 'Cadastro e Consulta de Divisões',
    icon: <People color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    id: 4,
    url: 'rh/tipo-beneficios',
    title: 'Tipos de Benefícios',
    description: 'Cadastro e Consulta de Benefícios',
    icon: <AccountBalance color='success' sx={{ height: 100, width: 80 }} />,
  },
  // MUDA AQUI
  {
    id: 5,
    url: 'rh/atribuir',
    title: 'Atribuir',
    permission: '',
    description: 'Atribuição de Férias, Benefícios, Gratificações ou Incidentes',
    icon: <LibraryAdd color='success' sx={{ height: 100, width: 80 }} />,
  },


  {
    id: 6,
    url: 'rh/ferias',
    title: 'Férias',
    description: 'Consulta de Férias',
    permission: '',
    icon: <BeachAccess color='info' sx={{ height: 100, width: 80 }} />,
  },
  {
    id: 7,
    url: 'rh/gratificacoes',
    title: 'Gratificações',
    description: 'Consulta de Gratificações',
    permission: '',
    icon: <CardGiftcard color='info' sx={{ height: 100, width: 80 }} />,
  },
  {
    id: 8,
    url: 'rh/incidentes',
    title: 'Incidentes',
    description: 'Consulta de Incidentes',
    permission: '',
    icon: <Report color='info' sx={{ height: 100, width: 80 }} />,
  },
  {
    id: 9,
    url: 'rh/beneficios',
    title: 'Benefícios',
    description: 'Consulta de Benefícios',
    permission: '',
    icon: <AccountBalance color='info' sx={{ height: 100, width: 80 }} />,
  },
];

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    <Home />
  </Link>,
  <Typography key="3" color="text.primary">
    Recursos Humanos
  </Typography>,
];

let abilities;

if (typeof window !== 'undefined') {
  const adminData = localStorage.getItem('admin-data');
  const parsedData = adminData ? JSON.parse(adminData) : null;
 abilities = parsedData?.abilities || '';
}

const Page = () => (
  <>
    <Head>
      <title>
        Recursos Humanos
      </title>
    </Head>
    <Box sx={{ pl: 3, pt: 1 }}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Recursos Humanos
              </Typography>
              <Typography variant="subtitle1">
                Acesso aos principais recursos dos funcinários.
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="title">
            Gestão de Funcionário
          </Typography>
          <Grid container spacing={2}>
            {data.slice(4, 9).map((rh) => {
              return (
                (abilities.includes(rh.permission) || (rh.permission === '')) &&

                <Grid item xs={3}>
                  <RhCard title={rh.title}
                    description={rh.description}
                    url={rh.url}
                    icon={rh.icon}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Divider />
          <Typography variant="title">
            Gestão de Dados
            <Tooltip sx={{ verticalAlign: 'sub' }} title="Os dados são compartilhados entre empresas.">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </Typography>
          <Grid container spacing={2}>
            {data.slice(0, 4).map((rh) => {
              return (
                <Grid item xs={3} key={rh.id}>
                  <RhCard title={rh.title}
                    description={rh.description}
                    url={rh.url}
                    icon={rh.icon}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
