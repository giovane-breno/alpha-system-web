import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Breadcrumbs, Button, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AdminsTable } from 'src/sections/admins/admins-table';
import { AdminsSearch } from 'src/sections/admins/admins-search';
import { applyPagination } from 'src/utils/apply-pagination';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
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

const useAdmins = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useAdminIds = (admins) => {
  return useMemo(
    () => {
      return admins.map((admin) => admin.id);
    },
    [admins]
  );
};

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const admins = useAdmins(page, rowsPerPage);
  const adminsIds = useAdminIds(admins);
  const adminsSelection = useSelection(adminsIds);

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
            <AdminsSearch />
            <AdminsTable
              count={data.length}
              items={admins}
              onDeselectAll={adminsSelection.handleDeselectAll}
              onDeselectOne={adminsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={adminsSelection.handleSelectAll}
              onSelectOne={adminsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={adminsSelection.selected}
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
