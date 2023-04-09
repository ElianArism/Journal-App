import { Button, Grid, Link, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { createUserWithEmailAndPassword } from "../../store/slices/thunks";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const formValidations = {
    email: [(value) => !value.includes("@"), "Email must have @"],
    password: [
      (value) => value.length <= 6,
      "Password must have more than 6 letters",
    ],
    name: [(value) => value.length < 1, "Name is required"],
  };
  const {
    email,
    password,
    name,
    formState,
    onInputChange,
    formInvalid,
    emailInvalid,
    passwordInvalid,
    nameInvalid,
  } = useForm(
    {
      email: "elian@gmail.com",
      password: "12354",
      name: "elian",
    },
    formValidations
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
          <Grid item xs={12} sm={6}>
            <Button
              disabled={formInvalid}
              variant="outlined"
              type="submit"
              fullWidth
            >
              Login
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
