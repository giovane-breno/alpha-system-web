import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Breadcrumbs, Button, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { WorkersTable } from 'src/sections/funcionarios/workers-table';
import { CustomersSearch, WorkersSearch } from 'src/sections/funcionarios/workers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { Home, NavigateNext } from '@mui/icons-material';

const now = new Date();

const data = [
  {
    id: '1',
    division: 'Divisão de Tecnologia da Informação',
    role: 'Desenvolvedor',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'giovane.breno@gmail.com',
    name: 'Giovane Breno Pereira Barbosa',
    username: '47645469811',
    isAdmin: 'true'
  },
  {
    id: '2',
    division: 'Núcleo de Gestão e Contratos',
    role: 'Contador',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'giovane.breno@gmail.com',
    name: 'Giovane Breno Pereira Barbosa',
    username: '47645469811'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    <Home/>
  </Link>,
  <Typography key="3" color="text.primary">
    Funcionários
  </Typography>,
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Funcionários
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
                  Funcionários
                </Typography>
                <Typography variant="subtitle1">
                  Tabela contendo todos os Funcionários cadastrados.
                </Typography>
              </Stack>
              <div>
                <Link href={"/funcionarios/cadastrar"}>

                  <Button
                  color='success'
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Cadastrar Funcionário
                  </Button>
                </Link>
              </div>
            </Stack>
            <WorkersSearch />
            <WorkersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container >
      </Box >
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
