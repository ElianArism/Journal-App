import { Button, Grid, Link, TextField } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="full name"
              type="text"
              placeholder="John Doe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder="email@email.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder="email@email.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder="******"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
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
