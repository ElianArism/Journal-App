import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/slices/journal/journalSlice";

export const SidebarItem = memo(({ title, body, ...note }) => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector((state) => state.journal);

  const newTitle = useMemo(() => {
    return title.length > 17 ? `${title.substring(0, 14)}...` : title;
  }, [title]);
  const newBody = useMemo(() => {
    return body.length > 17 ? `${body.substring(0, 14)}...` : body;
  }, [body]);
  const isActive = useMemo(() => {
    return note.id === activeNote?.id;
  }, [body]);

  const onClickNote = () => {
    dispatch(
      setActiveNote({
        title,
        body,
        ...note,
      })
    );
  };

  return (
    <ListItem onClick={onClickNote} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
});
