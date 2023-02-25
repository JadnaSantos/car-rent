import { AppRouter } from './router';
import { GlobalStyle } from './styles/global';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/default';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from './contexts/auth';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './components/ErrorHandler';


function App() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorHandler}
        onError={(arg1, arg2) => {
          console.log('arg1', arg1, 'arg2', arg2);
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
          <GlobalStyle />
          <ToastContainer />
        </ThemeProvider>
      </ErrorBoundary>
    </>

  );
}

export { App };
