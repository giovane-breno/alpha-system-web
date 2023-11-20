import Head from 'next/head';
import { Box, Breadcrumbs, Button, Container, Link, Pagination, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Home, NavigateNext } from '@mui/icons-material';
import { AssignWorker } from 'src/sections/rh/atribuir/AssignWorker';

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
