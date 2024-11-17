import { Route, Routes } from "react-router";
import MainScreen from "./pages/mainscreen/MainScreen";

function App() {
  return (
    <Routes>
        <Route path="" element={<MainScreen />}/>
    </Routes>
  );
}

export default App;
