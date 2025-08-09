import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          New Parent Resource Finder
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to="/">
            Home
          </Button>
          <Button component={RouterLink} to="/news">
            News
          </Button>
          <Button component={RouterLink} to="/vaccines">
            Vaccines
          </Button>
          <Button component={RouterLink} to="/log">
            Log
          </Button>
          <Button component={RouterLink} to="/milestones">
            Milestones
          </Button>
          <Button component={RouterLink} to="/todos">
            To-Do
          </Button>
          <Button component={RouterLink} to="/quotes">
            Quotes
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
