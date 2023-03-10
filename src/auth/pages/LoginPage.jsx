import { Google } from "@mui/icons-material";
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container>
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
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
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
