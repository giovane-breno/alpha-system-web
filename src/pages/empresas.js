import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Breadcrumbs, Button, Container, Link, Pagination, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { WorkersTable } from 'src/sections/funcionarios/workers-table';
import { CustomersSearch, WorkersSearch } from 'src/sections/funcionarios/workers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { CompaniesTable } from 'src/sections/empresas/companies-table';
import { CompaniesSearch } from 'src/sections/empresas/companies-search';
import { Home, NavigateNext } from '@mui/icons-material';
import { FindActiveCompanies } from 'src/services/CompaniesService';

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    <Home />
  </Link>,
  <Typography key="3" color="text.primary">
    Empresas
  </Typography>,
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [refreshState, setRefreshState] = useState();
  const { data, pagination, isLoading, isEmpty } = FindActiveCompanies(page, filter, refreshState);

  let abilities;

  if (typeof window !== 'undefined') {
    const adminData = localStorage.getItem('admin-data');
    const parsedData = adminData ? JSON.parse(adminData) : null;
   abilities = parsedData?.abilities || '';
  }
  
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
          Empresas
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
                  Empresas
                </Typography>
                <Typography variant="subtitle1">
                  Tabela contendo todas as Empresas cadastradas.
                </Typography>
              </Stack>
              {abilities.includes('createCompany') &&
                <div>
                  <Link href={"/empresas/cadastrar"}>
                    <Button
                      color='success'
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                    >
                      Cadastrar Empresa
                    </Button>
                  </Link>
                </div>
              }
            </Stack>
            <CompaniesSearch filter={filter} setFilter={setFilter} />
            <CompaniesTable
              abilities={abilities}
              count={pagination.total_pages}
              items={data}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={pagination.per_page}
              isLoading={isLoading}
              isEmpty={isEmpty}

              refreshState={refreshState}
              setRefreshState={setRefreshState}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
