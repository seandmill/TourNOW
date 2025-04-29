import React, { Suspense } from 'react';
import { SpinnerPage } from '@/components/loading/Spinner'; // the spinner you designed
import { AppRoutes } from './routes';


export function App() {
  return (
    <Suspense fallback={<SpinnerPage />}>
      <AppRoutes />
    </Suspense>
  );
};