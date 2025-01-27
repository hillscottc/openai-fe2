import * as React from "react";
import Konvo from "./Konvo";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline enableColorScheme />
        <Container component="main">
          <Konvo />
        </Container>
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
};
export default App;
