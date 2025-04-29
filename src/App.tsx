import { Suspense } from 'react';
import { SpinnerPage } from '@/components/loading/Spinner';
import { AppRoutes } from './routes';


export function App() {
  return (
    <Suspense fallback={<SpinnerPage />}>
      <AppRoutes />
    </Suspense>
  );
};