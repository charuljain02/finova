import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./components/dashboard/Dashboard";
import { FinanceProvider } from "./context/FinanceContext";

function App() {
  return (
    <FinanceProvider>
      <div className="flex bg-gray-100 dark:bg-[#0B0E14] text-gray-900 dark:text-gray-100">
        
        <Sidebar />

        {/* Offset for sidebar */}
        <main className="flex-1 ml-20 min-h-screen">
          <Dashboard />
        </main>

      </div>
    </FinanceProvider>
  );
}

export default App;