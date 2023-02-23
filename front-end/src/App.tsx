import { AppRouter } from './router';
import { GlobalStyle } from './styles/global';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/default';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from './contexts/auth';


function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer />
    </ThemeProvider>
  );
}

export { App };
