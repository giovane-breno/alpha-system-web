import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { Money, Note, VerifiedUser } from '@mui/icons-material';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { GetAdminCount, GetDemonstrativeSum, GetSalarySum, GetUserCount } from 'src/services/WorkersService';

const now = new Date();

const Page = () => {
  let userData;
  let abilities;

  if (typeof window !== 'undefined') {
    const adminData = JSON.parse(localStorage.getItem('admin-data'));
    userData = JSON.parse(localStorage.getItem('user-data'));
    const parsedData = adminData ? adminData : null;
    abilities = parsedData?.abilities || '';
  }

  const { data: userCount } = GetUserCount();
  const { data: adminCount } = GetAdminCount();
  const { data: demonstrativeSum } = GetDemonstrativeSum();
  const { data: salarySum } = GetSalarySum();


  return (

    <>
      <Head>
        <title>
          A L P H A - S Y S T E M
        </title>
      </Head>
      {(abilities.includes('isOperator') || abilities.includes('isAdministrator')) &&

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="xl">
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                sm={6}
                lg={3}
              >
                <OverviewTotalProfit
                  sx={{ height: '100%' }}
                  value={userCount}
                  title="Funcionários Cadastrados"
                  icon={<UserIcon />}
                />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                lg={3}
              >
                <OverviewTotalProfit
                  sx={{ height: '100%' }}
                  value={adminCount}
                  title="Admins Cadastrados"
                  icon={<VerifiedUser />}
                />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                lg={3}
              >
                <OverviewTotalProfit
                  sx={{ height: '100%' }}
                  title="Salário Líquido Gerados"
                  value={`R$ ${salarySum}`}
                  icon={<Money />}

                />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                lg={3}
              >
                <OverviewTotalProfit
                  sx={{ height: '100%' }}
                  title="Demonstrativos Gerados"
                  value={demonstrativeSum}
                  icon={<Note />}

                />
              </Grid>
              <Grid
                xs={12}
                lg={8}
              >
              </Grid>
            </Grid>
          </Container>
        </Box>
      }
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
