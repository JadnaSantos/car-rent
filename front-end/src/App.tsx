import { AppRouter } from './router';
import { GlobalStyle } from './styles/global';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/default';
import 'react-toastify/dist/ReactToastify.min.css';


function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppRouter />
      <GlobalStyle />
      <ToastContainer />

    </ThemeProvider>
  );
}

export { App };
