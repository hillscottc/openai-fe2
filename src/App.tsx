import * as React from "react";
import ChatBot from "./ChatBot";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <Paper elevation={8}>
        <ChatBot />
      </Paper>
      <Footer />
    </React.Fragment>
  );
}
