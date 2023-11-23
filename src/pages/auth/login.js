import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { doLogin } from 'src/services/AuthenticationService';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const Page = () => {
  useEffect(() => {
    let token = sessionStorage.getItem('token');
    if (token) {
      enqueueSnackbar('Estamos o redirecionando, aguarde...', { variant: 'info', position: 'top-right' });
      router.push('/');
    }
  }, []);
  const router = useRouter();
  const [error, setError] = useState();
  const auth = useAuth();

  const [form, setForm] = useState({
    username: '',
    password: ''
  })



  const saveForm = async () => {
    try {
      await auth.signIn(form);
      router.refresh();


    } catch (error) {
      const path = error.response?.data.errors;
      setError(path);

      console.log(error);

      if (error.response?.data.message === 'Credenciais invalidas') {
        enqueueSnackbar(`${error.response?.data.message}, verifique o usuário ou senha!`, { variant: 'error', position: 'top-right' });

        setError({
          ...error,
          username: 'Email ou senha incorreta.',
          password: 'Email ou senha incorreta.',
        });
      } else {
        enqueueSnackbar('Verifique os erros do formulário!', { variant: 'error', position: 'top-right' });
      }
    }
  }

  return (
    <SnackbarProvider autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <Head>
        <title>
          Login | Alpha System
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 6 }}
            >
              <Typography variant="h1">
                Bem-Vindo ao Alpha System
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <TextField fullWidth label="Usuário" type="text" variant="outlined" required value={form.username} onChange={e => { setForm({ ...form, username: e.target.value }) }} error={!!(error?.username)} helperText={error?.username} />
              <TextField fullWidth label="Senha" type="password" variant="outlined" required value={form.password} onChange={e => { setForm({ ...form, password: e.target.value }) }} error={!!(error?.password)} helperText={error?.password} />
            </Stack>
            <Typography variant='subtitle2' sx={{ pt: 1 }}>
              Esqueceu a senha? <b><Link href="#">Clique Aqui!</Link></b>
            </Typography>
            <Button
              onClick={saveForm}
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </div>
        </Box>
      </Box>
    </SnackbarProvider>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
