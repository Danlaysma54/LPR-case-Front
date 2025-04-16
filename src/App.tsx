import { Route, Routes } from "react-router-dom";

import MainScreen from "./pages/mainscreen/MainScreen";

import CreateCase from "@/pages/create-case/CreateCase";
import MainLayout from "@/shared/ui/main-layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainScreen />} />
        <Route path="createCase" element={<CreateCase />} />
      </Route>
    </Routes>
  );
}

export default App;
