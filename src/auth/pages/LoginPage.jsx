import { Google } from "@mui/icons-material";
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  checkingAuthentication,
  startGoogleSignIn,
} from "../../store/slices/thunks";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  const {
    formState: { password, email },
    onInputChange,
    onResetForm,
  } = useForm({ email: "test@test.com", password: "1234" });

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(checkingAuthentication(email, password));
    console.log(password, email);
  };

  const onGoogleSignIn = () => {
    console.log("google Sign in");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              onChange={onInputChange}
              name="email"
              value={email}
              placeholder="email@email.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              name="password"
              value={password}
              label="password"
              type="password"
              placeholder="******"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="outlined" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={onGoogleSignIn}
              variant="outlined"
              fullWidth
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <Link
            component={ReactLink}
            color={"inherit"}
            to="/auth/register"
          >
            Create account
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
