import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImgGallery } from "../components";

export const NoteView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography variant="p" fontSize={30} fontWeight="light">
          {new Date().toISOString()}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" xx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          autoComplete="on"
          placeholder="Add title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          autoComplete="on"
          placeholder="What happened today?"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>

      {/* Img Gallery */}
      <ImgGallery />
    </Grid>
  );
};
