import * as React from 'react';
import ChatBot from './ChatBot'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline';
import ProTip from './components/Tip';
import Copyright from './components/Copyright';


export default function App() {
  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <Paper elevation={8} variant="outlined" >
        <ChatBot />
        <ProTip />
        <Copyright />
      </Paper>
    </React.Fragment>
  )
}
