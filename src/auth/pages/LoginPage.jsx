import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  loginWithEmailAndPassword,
  startGoogleSignIn,
} from "../../store/slices/thunks";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  const {
    formState: { password, email },
    onInputChange,
    onResetForm,
  } = useForm({ email: "", password: "" });

  const { status, errDetails, ...userInfo } = useSelector(
    (state) => state.auth
  );

  const isAuthenticating = useMemo(
    () => status === "checking",
    [status]
  );

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginWithEmailAndPassword({ password, email }));
    console.log(userInfo);
  };

  const onGoogleSignIn = () => {
    console.log("google Sign in");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              autoComplete="on"
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
              autoComplete="on"
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
          <Grid
            display={!!errDetails?.errorMessage ? "" : "none"}
            item
            xs={12}
            sm={12}
            sx={{ my: 2 }}
          >
            <Alert severity="error">{errDetails?.errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              disabled={isAuthenticating}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={onGoogleSignIn}
              variant="outlined"
              fullWidth
              disabled={isAuthenticating}
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
