import { useState } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { TalentList } from "./pages/TalentList";
import { AITalentRecommendation } from "./pages/AITalentRecommendation";
import { RelationshipNetwork } from "./pages/RelationshipNetwork";

export default function App() {
  const [activePath, setActivePath] = useState("relationship-network");

  return (
    <MainLayout activePath={activePath} onNavigate={setActivePath}>
      {activePath === "dashboard" && <Dashboard />}
      {activePath === "talents" && <TalentList />}
      {activePath === "evaluations" && <div>Đánh giá (Đang phát triển)</div>}
      {activePath === "ai-recommendation" && <AITalentRecommendation />}
      {activePath === "relationship-network" && <RelationshipNetwork />}
    </MainLayout>
  );
}
