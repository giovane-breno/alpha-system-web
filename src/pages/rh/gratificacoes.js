import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Breadcrumbs, Button, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Home, NavigateNext } from '@mui/icons-material';
import { GratificationFilter } from 'src/sections/rh/gratificacoes/gratification-search';
import { GratificationTable } from 'src/sections/rh/gratificacoes/gratification-table';
import { FindActiveGratification } from 'src/services/HumanResourceService';

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
    Gratificações
  </Typography>,
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState();
  const [refreshState, setRefreshState] = useState();
  const { data, pagination, isLoading, isEmpty } = FindActiveGratification(page, filter, refreshState);

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
          Gratificações
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
                  Gratificações
                </Typography>
                <Typography variant="subtitle1">
                  Tabela contendo todos as Gratificações ativas e inativas cadastradas.
                </Typography>
              </Stack>
            </Stack>
            <GratificationFilter />
            <GratificationTable
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
