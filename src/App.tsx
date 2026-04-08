import { useState } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { TalentList } from "./pages/TalentList";
import { TalentRecommendation } from "./pages/TalentRecommendation";
import { RelationshipNetwork } from "./pages/RelationshipNetwork";
import { WorkHistory } from "./pages/WorkHistory";
import { TrainingDevelopment } from "./pages/TrainingDevelopment";

export default function App() {
  const [activePath, setActivePath] = useState("training-development");

  return (
    <MainLayout activePath={activePath} onNavigate={setActivePath}>
      {activePath === "dashboard" && <Dashboard />}
      {activePath === "talents" && <TalentList />}
      {activePath === "evaluations" && <div>Đánh giá (Đang phát triển)</div>}
      {activePath === "talent-recommendation" && <TalentRecommendation />}
      {activePath === "relationship-network" && <RelationshipNetwork />}
      {activePath === "work-history" && <WorkHistory />}
      {activePath === "training-development" && <TrainingDevelopment />}
    </MainLayout>
  );
}
