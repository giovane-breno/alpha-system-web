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
import { QueryDemonstrative } from 'src/sections/consultas/query-demonstrative';
import { Home, NavigateNext } from '@mui/icons-material';
import { AssignWorker } from 'src/sections/rh/atribuir/AssignWorker';

const now = new Date();

// const data = [
//   {
//     id: '848',
//     name: 'Empresa Ficticia LTDA',
//     corporate_name: 'Ficticia',
//     created_at: subDays(subHours(now, 7), 1).getTime(),
//     CNPJ: '12.345.678/9101-12',
//     town_registration: 'SP',
//     state_registration: 'SJC',
//   },
//   {
//     id: '1',
//     name: 'Empresa Ficticia LTDA',
//     corporate_name: 'Ficticia',
//     created_at: subDays(subHours(now, 7), 1).getTime(),
//     CNPJ: '12.345.678/9101-12',
//     town_registration: 'SP',
//     state_registration: 'SJC',
//   },
//   {
//     id: '2',
//     name: 'Empresa Ficticia LTDA',
//     corporate_name: 'Ficticia',
//     created_at: subDays(subHours(now, 7), 1).getTime(),
//     CNPJ: '12.345.678/9101-12',
//     town_registration: 'SP',
//     state_registration: 'SJC',
//   }
// ];

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
        Atribuições
    </Typography>,
];

const Page = () => {
    return (
        <>
            <Head>
                <title>
                    Atribuições
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
                                    Atribuições
                                </Typography>
                                <Typography variant="subtitle1">
                                    Área para atribuir Férias, Benefícios, Gratificações ou Incidentes.
                                </Typography>
                            </Stack>
                        </Stack>
                        <AssignWorker />
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
