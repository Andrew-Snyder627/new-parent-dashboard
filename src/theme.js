import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2e7d32", // calm, natural green
      light: "#60ad5e",
      dark: "#005005",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5e8d6a",
      light: "#8db597",
      dark: "#35533e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f7faf7", // soft, natural background
      paper: "#ffffff",
    },
    text: {
      primary: "#1b1b1b",
      secondary: "#4f5b50",
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(","),
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});

export default theme;
