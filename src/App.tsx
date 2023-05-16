import Header from "./components/header";
import Footer from "./components/footer";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import EndTournament from "./pages/EndTournament";
import MintUSDC from "./pages/MintUSDC";
import MintTicket from "./pages/MintTicket";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/end-tournament" element={<EndTournament />} />
        <Route path="/mint-usdc" element={<MintUSDC />} />
        <Route path="/mint-ticket" element={<MintTicket />} />
      </Routes>
    </Layout>
  );
}

export default App;
