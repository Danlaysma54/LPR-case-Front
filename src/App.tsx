import { Route, Routes } from "react-router";
import MainScreen from "./pages/mainscreen/MainScreen";

function App() {
  return (
    <Routes>
        <Route path="mainscreen" element={<MainScreen />} />
    </Routes>
  );
}

export default App;
