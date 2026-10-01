import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}