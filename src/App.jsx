import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Header } from "./components/layout/Header"; // Header import karein
import { Footer } from "./components/layout/Footer"; // Footer import karein
import { FinanceProvider } from "./context/FinanceContext";

function App() {
  return (
    <FinanceProvider>
      {/* light-grid-bg ko main wrapper pe rakhein taaki poora page cover ho */}
      <div className="flex min-h-screen light-grid-bg transition-colors duration-300">
        
        <Sidebar />

        {/* Main Content Area */}
        {/* lg:ml-16 use karein kyunki Sidebar ki width w-16 hai */}
        <div className="flex-1 flex flex-col ml-0 lg:ml-16 relative z-10 pt-16 lg:pt-0 overflow-x-hidden">
          
          <Header />
          
          {/* Dashboard (Main Content) */}
          {/* px-4/px-10 ensure karta hai ki cards screen ke edges se na chipkein */}
          <main className="px-4 md:px-10 pb-10 flex-1 relative z-30 -mt-16 md:-mt-20 lg:-mt-24">
            <div className="max-w-[1400px] mx-auto">
              <Dashboard />
            </div>
          </main>

          <Footer />
        </div>

      </div>
    </FinanceProvider>
  );
}

export default App;