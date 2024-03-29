import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/slices/journal/journalSlice";
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/slices/journal/thunks";
import { ImgGallery } from "../components";

export const NoteView = () => {
  const { activeNote, uiMessage, isSaving } = useSelector(
    (state) => state.journal
  );
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const {
    id,
    title,
    body,
    date,
    imageUrls,
    onInputChange,
    formState,
  } = useForm(activeNote);

  const dateString = useMemo(() => {
    return new Date(date).toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(
      setActiveNote({
        id,
        title,
        body,
        date,
        imageUrls,
      })
    );
  }, [formState]);

  useEffect(() => {
    console.log(activeNote);
    if (!!uiMessage)
      Swal.fire({
        title: "Note updated",
        html: uiMessage,
        icon: "success",
      });
  }, [uiMessage]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  const onAddFileChange = ({ target }) => {
    if (target.files.length < 1) return;

    dispatch(startUploadingFiles(target.files));
  };

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
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          style={{ display: "none" }}
          onChange={onAddFileChange}
          type="file"
          ref={fileInputRef}
          multiple
        />
        <IconButton
          onClick={() => fileInputRef.current.click()}
          color="primary"
          disabled={isSaving}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          onClick={onSaveNote}
          color="primary"
          disabled={isSaving}
          xx={{ padding: 2 }}
        >
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
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          type="text"
          name="body"
          variant="filled"
          fullWidth
          multiline
          value={body}
          onChange={onInputChange}
          autoComplete="on"
          placeholder="What happened today?"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDeleteNote} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid>

      {/* Img Gallery */}
      <ImgGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
