// src/pages/DashboardPage.jsx
import { Dashboard as DashboardComponent } from "../components/dashboard/Dashboard";
import { FinanceProvider } from "../context/FinanceContext";

export default function DashboardPage() {
  return (
    <FinanceProvider>
      <DashboardComponent />
    </FinanceProvider>
  );
}