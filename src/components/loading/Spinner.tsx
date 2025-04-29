import { Loader2 } from 'lucide-react';

export function SpinnerPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-100 to-blue-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="text-xl text-blue-700 font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}