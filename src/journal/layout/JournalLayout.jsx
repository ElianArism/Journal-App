import { AddOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startAddNewNote } from "../../store/slices/journal/thunks";
import { NavBar, Sidebar } from "../components";

const _drawerWidth = 300;

export const JournalLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { isSaving } = useSelector((state) => state.journal);
  const onClickNewNote = () => {
    dispatch(startAddNewNote());
  };
  return (
    <Box sx={{ display: "flex", p: 3, mt: 8 }}>
      {/* Navbar  (drawer) */}
      <NavBar drawerWidth={_drawerWidth}></NavBar>

      {/* Sidebar */}
      <Sidebar drawerWidth={_drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        {/* Toolbar  */}
        {children}
      </Box>

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{
          position: "fixed",
          right: 50,
          bottom: 50,
          color: "white",
          backgroundColor: `error.main`,
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};
