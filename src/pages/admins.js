import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Breadcrumbs, Button, Container, Link, Stack, SvgIcon, Typography, setRef } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AdminsTable } from 'src/sections/admins/admins-table';
import { AdminsSearch } from 'src/sections/admins/admins-search';
import { applyPagination } from 'src/utils/apply-pagination';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Home, NavigateNext } from '@mui/icons-material';
import { FindActiveAdmins } from 'src/services/WorkersService';

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    <Home />
  </Link>,
  <Typography key="3" color="text.primary">
    Administradores
  </Typography>,
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState();
  const [refreshState, setRefreshState] = useState();
  const { data, pagination, isLoading, isEmpty } = FindActiveAdmins(page, filter, refreshState);

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
          Administradores
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
                  Administradores
                </Typography>
                <Typography variant="subtitle1">
                  Tabela contendo todos os Administradores cadastrados.
                </Typography>
              </Stack>
              <div>

                <Button
                  color='success'
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Cadastrar
                </Button>
              </div>
            </Stack>
            <AdminsSearch filter={filter} setFilter={setFilter} />
            <AdminsTable
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
