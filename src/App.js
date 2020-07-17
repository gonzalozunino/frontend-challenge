import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Wizard from "./components/Wizard";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Users might have specified a preference for a light or dark theme.
  // This method can leverage this preference dynamically with the useMediaQuery hook and the prefers-color-scheme media query.
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
        // Apply Amatic font and size
        typography: {
          fontSize: 18,
          fontFamily: [
            "Amatic SC",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
      }),
    [prefersDarkMode]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wizard />
      </ThemeProvider>
    </Router>
  );
};

export default App;
