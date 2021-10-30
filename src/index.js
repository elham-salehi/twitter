import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import  theme from './components/theme'



ReactDOM.render(
    <ThemeProvider theme={theme}>
  <React.StrictMode>
  <App/>
  </React.StrictMode>
    </ThemeProvider>,
  document.getElementById('root')
);

