import { AppBar, Box, ThemeProvider, Toolbar, Typography } from "@mui/material";
import theme from "./styles/theme/theme";
import { SnackbarProvider } from "notistack";
import MainFormPage from "./pages/mainForm/MainFormPage";

import "./styles/global.css";
import { CheckCircleOutline } from "@mui/icons-material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        preventDuplicate
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <>
          <AppBar sx={{ bgcolor: "#003c60" }}>
            <Toolbar sx={{display:'flex', gap:'20px', justifyContent:'center'}}>
              <Box  sx={{display:'flex', gap:'15px', alignItems:'center'}}>
                <CheckCircleOutline/>
                <Typography variant="body2">Secure UK Website</Typography>
              </Box>
              <Box sx={{display:'flex', gap:'15px', alignItems:'center'}}>
              <CheckCircleOutline/>
                <Typography variant="body2">
                  We never change any fees
                </Typography>
              </Box>
              <Box sx={{display:'flex', gap:'15px', alignItems:'center'}}>
              <CheckCircleOutline/>
                <Typography variant="body2">100% online</Typography>
              </Box>

              <Box sx={{display:'flex', gap:'15px', alignItems:'center'}}>
              <CheckCircleOutline/>
                <Typography variant="body2">Decision in minutes</Typography>
              </Box>
            </Toolbar>
          </AppBar>

          <MainFormPage />
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
