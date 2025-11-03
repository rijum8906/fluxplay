import AppRouter from '@/AppRouter';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="min-h-full min-w-full">
      <Toaster />
      <AppRouter />
    </div>
  );
}

export default App;
