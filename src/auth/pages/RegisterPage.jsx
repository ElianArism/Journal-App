import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { createUserWithEmailAndPassword } from "../../store/slices/thunks";
import { AuthLayout } from "../layout/AuthLayout";

const formValidations = {
  email: [(value) => !value.includes("@"), "Email must have @"],
  password: [
    (value) => value.length <= 6,
    "Password must have more than 6 letters",
  ],
  name: [(value) => value.length < 1, "Name is required"],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const {
    name,
    email,
    password,
    formState,
    formInvalid,
    nameInvalid,
    emailInvalid,
    onInputChange,
    passwordInvalid,
  } = useForm(
    {
      email: "elian@gmail.com",
      password: "12354",
      name: "elian",
    },
    formValidations
  );

  const { status, errDetails } = useSelector((state) => state.auth);
  const checkingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );
  const onSubmit = (e) => {
    e.preventDefault();
    if (formInvalid) return;
    dispatch(
      createUserWithEmailAndPassword({
        email,
        password,
        name,
      })
    );
  };
  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!nameInvalid}
              helperText={nameInvalid}
              label="full name"
              type="text"
              name={"name"}
              value={name}
              onChange={onInputChange}
              placeholder="John Doe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!emailInvalid}
              helperText={emailInvalid}
              label="email"
              type="email"
              name={"email"}
              value={email}
              onChange={onInputChange}
              placeholder="email@email.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!passwordInvalid}
              helperText={passwordInvalid}
              label="password"
              type="password"
              name={"password"}
              value={password}
              onChange={onInputChange}
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

          <Grid item xs={12} sm={12}>
            <Button
              disabled={formInvalid || checkingAuthentication}
              variant="outlined"
              type="submit"
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          Do you have an account?
          <Link
            sx={{ ml: 1 }}
            component={ReactLink}
            color={"inherit"}
            to="/auth/Login"
          >
            Sign in
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
