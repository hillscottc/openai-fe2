import * as React from "react";
import ChatBot from "./ChatBot";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer";
import Container from "@mui/material/Container";

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <Container component="main">
        <ChatBot />
      </Container>
      <Footer />
    </React.Fragment>
  );
};
export default App;
