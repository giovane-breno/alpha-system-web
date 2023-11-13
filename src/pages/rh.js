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
  Link
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/empresas/companies-table';
import { CompaniesSearch } from 'src/sections/empresas/companies-search';
import { RhCard } from 'src/sections/rh/rh-card';
import { RhSearch } from 'src/sections/rh/rh-search';
import { RhTable } from 'src/sections/rh/rh-table';
import { AccountBalance, BeachAccess, CardGiftcard, Home, LibraryAdd, ManageAccounts, NavigateNext, People, Person, PlusOne, Report } from '@mui/icons-material';

// Beneficios
// Divisões
// Gratificações
// Incidentes
// Funções
// férias
const data = [
  {
    url: 'rh/funcoes-administrativas',
    title: 'Funções Administrativas',
    description: 'Cadastro e Consulta de Funções',
    icon: <ManageAccounts color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/funcoes',
    title: 'Funções',
    description: 'Cadastro e Consulta de Funções',
    icon: <Person color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/divisoes',
    title: 'Divisões',
    description: 'Cadastro e Consulta de Divisões',
    icon: <People color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/tipo-beneficios',
    title: 'Tipos de Benefícios',
    description: 'Cadastro e Consulta de Benefícios',
    icon: <AccountBalance color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/atribuir',
    title: 'Atribuir',
    description: 'Atribuição de Férias, Benefícios, Gratificações ou Incidentes',
    icon: <LibraryAdd color='success' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/ferias',
    title: 'Férias',
    description: 'Consulta de Férias',
    icon: <BeachAccess color='info' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/gratificacoes',
    title: 'Gratificações',
    description: 'Consulta de Gratificações',
    icon: <CardGiftcard color='info' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/incidentes',
    title: 'Incidentes',
    description: 'Consulta de Incidentes',
    icon: <Report color='info' sx={{ height: 100, width: 80 }} />,
  },
  {
    url: 'rh/beneficios',
    title: 'Benefícios',
    description: 'Consulta de Benefícios',
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
          </Typography>
          <Grid container spacing={2}>
            {data.slice(0, 4).map((rh) => {
              return (
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
