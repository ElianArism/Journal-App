import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar";

const _drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar  (drawer) */}
      <NavBar drawerWidth={_drawerWidth}></NavBar>

      {/* Sidebar */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar  */}
        {children}
      </Box>
    </Box>
  );
};
