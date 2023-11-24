import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { addDays, subDays, subHours } from 'date-fns';
import { Box, Breadcrumbs, Button, Container, Link, Stack, SvgIcon, Typography, setRef } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { CreateModal } from 'src/sections/rh/divisoes/modal/divisoes-create-modal';
import { DivisoesSearch } from 'src/sections/rh/divisoes/divisoes-search';
import { DivisoesTable } from 'src/sections/rh/divisoes/divisoes-table';
import { Home, NavigateNext } from '@mui/icons-material';
import { VacationTable } from 'src/sections/rh/ferias/vacation-table';
import { VacationFilter } from 'src/sections/rh/ferias/vacation-search';
import { FindActiveVacation } from 'src/services/HumanResourceService';
import { CheckExistingCompany } from 'src/services/CompaniesService';

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    <Home />
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/rh"
  >
    Recursos Humanos
  </Link>,
  <Typography key="3" color="text.primary">
    Férias
  </Typography>,
];

const Page = () => {
  useEffect(() => {
    setCompany(CheckExistingCompany());
  }, []);

  const [company, setCompany] = useState();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState();
  const [refreshState, setRefreshState] = useState();
  const { data, pagination, isLoading, isEmpty } = FindActiveVacation(page, filter, refreshState, company);

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
          Férias
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
                  Férias
                </Typography>
                <Typography variant="subtitle1">
                  Tabela contendo todas as férias ativas e inativas.
                </Typography>
              </Stack>
            </Stack>
            <VacationFilter filter={filter} setFilter={setFilter} />
            <VacationTable
              refreshState={refreshState}
              setRefreshState={setRefreshState}
              count={pagination.total_pages}
              items={data}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={pagination.per_page}
              isLoading={isLoading}
              isEmpty={isEmpty}
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
