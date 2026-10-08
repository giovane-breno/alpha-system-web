import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import PaymentsRounded from '@mui/icons-material/PaymentsRounded';
import SecurityRounded from '@mui/icons-material/SecurityRounded';

const features = [
  { icon: <PaymentsRounded />, title: 'Folha de pagamento', text: 'Organize dados, cálculos e demonstrativos em um fluxo único.' },
  { icon: <GroupsRounded />, title: 'Gestão de pessoas', text: 'Mantenha empresas, funcionários e divisões sempre estruturados.' },
  { icon: <SecurityRounded />, title: 'Acesso por perfil', text: 'Controle responsabilidades com autenticação e permissões.' }
];

const modules = ['Web', 'Desktop', 'Mobile', 'API'];

const Page = () => (
  <>
    <Head>
      <title>Alpha System | Gestão de folha de pagamento</title>
      <meta name="description" content="Alpha System: uma plataforma para organizar folha de pagamento e rotinas de recursos humanos." />
    </Head>

    <Box sx={{ bgcolor: '#fff', color: '#111927', overflow: 'hidden' }}>
      <Box component="header" sx={{ borderBottom: '1px solid #eef2f6', position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 78 }}>
            <Box component={NextLink} href="/" sx={{ display: 'inline-flex' }}><Box component="img" src="/logo.png" alt="Alpha System" sx={{ width: 132, height: 'auto' }} /></Box>
            <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button component="a" href="#produto" color="inherit" sx={{ fontWeight: 700 }}>Produto</Button>
              <Button component="a" href="#modulos" color="inherit" sx={{ fontWeight: 700 }}>Módulos</Button>
              <Button component="a" href="#sobre" color="inherit" sx={{ fontWeight: 700 }}>Sobre</Button>
            </Stack>
            <Button component={NextLink} href="/auth/login" variant="outlined" startIcon={<AccountCircleRounded />} sx={{ borderRadius: 2, fontWeight: 800 }}>Entrar</Button>
          </Stack>
        </Container>
      </Box>

      <Box component="main" sx={{ background: 'radial-gradient(circle at 85% 12%, rgba(99,102,241,.12), transparent 28%), linear-gradient(180deg,#fbfdff 0%,#fff 55%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center" sx={{ py: { xs: 8, md: 13 } }}>
            <Grid xs={12} md={6}>
              <Stack spacing={3}>
                <Chip label="Plataforma de gestão · Alpha System" sx={{ alignSelf: 'flex-start', bgcolor: '#eef2ff', color: '#4338ca', fontWeight: 800 }} />
                <Typography variant="h1" sx={{ fontSize: { xs: 46, md: 70 }, lineHeight: .98, letterSpacing: '-.065em', fontWeight: 900, maxWidth: 650 }}>Folha de pagamento com <Box component="span" sx={{ color: 'primary.main' }}>clareza.</Box></Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 550, lineHeight: 1.7, fontWeight: 400 }}>Um sistema para organizar rotinas de recursos humanos, conectar equipes e transformar dados em decisões mais simples.</Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button component={NextLink} href="/auth/login" variant="contained" size="large" endIcon={<ArrowForwardRounded />} sx={{ borderRadius: 2, px: 3, py: 1.5, fontWeight: 800 }}>Acessar sistema</Button>
                  <Button component="a" href="#produto" variant="outlined" size="large" sx={{ borderRadius: 2, px: 3, py: 1.5, fontWeight: 800 }}>Conhecer recursos</Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Box sx={{ position: 'relative', py: 3 }}>
                <Box sx={{ position: 'absolute', inset: 20, borderRadius: 8, bgcolor: 'primary.main', opacity: .1, filter: 'blur(38px)' }} />
                <Card sx={{ position: 'relative', overflow: 'hidden', border: '1px solid #dbe4f0', borderRadius: 3, boxShadow: '0 28px 70px rgba(25,66,112,.16)', transform: 'rotate(1deg)' }}>
                  <Box sx={{ height: 34, px: 2, display: 'flex', alignItems: 'center', gap: .7, borderBottom: '1px solid #edf1f5', bgcolor: '#fbfdff' }}>{[1, 2, 3].map((item) => <Box key={item} sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#d5deea' }} />)}</Box>
                  <Box component="img" src="/alpha-dashboard.jpg" alt="Dashboard do Alpha System" sx={{ width: '100%', height: { xs: 235, md: 300 }, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  <Chip label="gestão · RH · payroll" size="small" sx={{ position: 'absolute', right: 18, bottom: 16, bgcolor: '#111927', color: '#fff', fontWeight: 800 }} />
                </Card>
              </Box>
            </Grid>
          </Grid>

          <Divider />
          <Grid container spacing={3} sx={{ py: 4 }}>{[['10', 'sprints documentadas'], ['4', 'frentes do sistema'], ['1', 'produto integrado'], ['6', 'integrantes no time']].map(([value, label]) => <Grid key={label} xs={6} md={3}><Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-.05em' }}>{value}</Typography><Typography variant="body2" color="text.secondary">{label}</Typography></Grid>)}</Grid>
        </Container>

        <Box id="produto" sx={{ bgcolor: '#f6f9fc', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Stack spacing={2} sx={{ mb: 5, maxWidth: 650 }}><Typography variant="overline" color="primary" sx={{ fontWeight: 900, letterSpacing: '.12em' }}>O produto</Typography><Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-.06em' }}>Uma base para operar melhor.</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>Recursos pensados para reduzir ruído administrativo e dar mais visibilidade às rotinas de pessoas.</Typography></Stack>
            <Grid container spacing={2}>{features.map((feature) => <Grid key={feature.title} xs={12} md={4}><Card sx={{ height: '100%', border: '1px solid #e6ebf2', borderRadius: 2.5, boxShadow: 'none' }}><CardContent sx={{ p: 3.2 }}><Box sx={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 1.5, bgcolor: '#eaf2ff', color: 'primary.main' }}>{feature.icon}</Box><Typography variant="h6" sx={{ mt: 2.5, fontWeight: 800 }}>{feature.title}</Typography><Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.65 }}>{feature.text}</Typography></CardContent></Card></Grid>)}</Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" id="modulos">
          <Grid container spacing={{ xs: 5, md: 9 }} alignItems="center" sx={{ py: { xs: 8, md: 12 } }}>
            <Grid xs={12} md={5}><Stack spacing={2.5}><Typography variant="overline" color="primary" sx={{ fontWeight: 900, letterSpacing: '.12em' }}>Um ecossistema</Typography><Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-.06em' }}>Várias portas para o mesmo fluxo.</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>O Alpha System foi pensado como um produto multiplataforma, com frentes que conversam entre si.</Typography><Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>{modules.map((module) => <Chip key={module} label={module} sx={{ fontWeight: 800 }} />)}</Stack></Stack></Grid>
            <Grid xs={12} md={7}><Box component="img" src="/alpha-module-view.png" alt="Tela de consultas e demonstrativo do Alpha System" sx={{ width: '100%', display: 'block', border: '1px solid #dce6f0', borderRadius: 3, boxShadow: '0 24px 55px rgba(25,66,112,.12)' }} /></Grid>
          </Grid>
        </Container>

        <Box id="sobre" sx={{ bgcolor: '#111927', color: '#fff', py: { xs: 8, md: 11 } }}><Container maxWidth="lg"><Grid container spacing={5} alignItems="center"><Grid xs={12} md={7}><Typography variant="overline" sx={{ color: '#76d8ef', fontWeight: 900, letterSpacing: '.12em' }}>Projeto acadêmico</Typography><Typography variant="h2" sx={{ mt: 1, fontWeight: 900, letterSpacing: '-.06em' }}>Da ideia à entrega.</Typography><Typography sx={{ mt: 2, color: '#a6b2c3', maxWidth: 650, lineHeight: 1.8 }}>Um trabalho de conclusão construído em equipe, com requisitos, diagramas, sprints, testes e documentação para transformar uma necessidade real em produto.</Typography></Grid><Grid xs={12} md={5}><Stack spacing={1.5}>{['Casos de uso e requisitos', 'Diagramas de classe e dados', 'Testes com usuários', 'Documentação por sprint'].map((item) => <Stack key={item} direction="row" spacing={1.5} alignItems="center"><Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#20c9e8' }} /><Typography sx={{ fontWeight: 700 }}>{item}</Typography></Stack>)}</Stack></Grid></Grid></Container></Box>
      </Box>

      <Box component="footer" sx={{ borderTop: '1px solid #e6ebf2', py: 3 }}><Container maxWidth="lg"><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}><Typography variant="caption" color="text.secondary">Alpha System · Gestão de folha de pagamento</Typography><Typography variant="caption" color="text.secondary">Projeto acadêmico · 2023</Typography></Stack></Container></Box>
    </Box>
  </>
);

export default Page;

Page.public = true;
