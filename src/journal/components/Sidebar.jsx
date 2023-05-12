import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ drawerWidth }) => {
  const {
    auth: { displayName },
    journal: { notes },
  } = useSelector((state) => state);

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="p">
              {displayName ?? ""}
            </Typography>
          </Toolbar>
          <Divider></Divider>
          <List>
            {notes.map((note) => (
              <SidebarItem {...note} key={note.id} />
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};
