import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import LoginPage from './pages/LoginPage';
import LaunchesPage from './pages/LaunchesPage';
import LaunchDetailPage from './pages/LaunchDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: 'launch',
        element: (
          <ProtectedRoute>
            <LaunchesPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'launch/:id',
        element: (
          <ProtectedRoute>
            <LaunchDetailPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
