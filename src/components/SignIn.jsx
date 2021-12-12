import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { checkToken, signInGetToken } from '../services/signIn.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/authenticationAction';
const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    console.log(id);
    if (token) {
      checkToken(id, token)
        .then((res) => {
          dispatch(setUser(res.data));
          navigate('/home');
        })
        .catch((err) => console.error(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const signInToServer = (data) => {
    console.log(data);
    // {
    // "email": "olivier@mail.com",
    // "password": "bestPassw0rd"
    // }
    signInGetToken(data.email, data.password)
      .then((res) => {
        let token = res.data.accessToken;
        let id = res.data.user.id;
        console.log(token);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        console.log(res.data);
        // dispatch(setUser(res.data));
      })
      .then(() => navigate('/home'));
  };
  console.log(errors);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1">
            For your dream vacation
          </Typography>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(signInToServer)}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // required
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              })}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address *"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {errors.email?.type === 'required' && (
              <span style={{ color: 'red' }}>* Email is required</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span style={{ color: 'red' }}>* Email is not valid</span>
            )}

            <TextField
              {...register('password', { required: true })}
              margin="normal"
              fullWidth
              name="password"
              label="Password *"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password?.type === 'required' && (
              <span style={{ color: 'red' }}>* Password is required</span>
            )}
            {/* Remember */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkMUI href="#" variant="body2">
                  Forgot password?
                </LinkMUI>
              </Grid>
              <Grid item>
                <LinkMUI component={Link} to="/signup">
                  {"Don't have an account? Sign Up"}
                </LinkMUI>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
