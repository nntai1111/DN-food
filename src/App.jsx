import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 1000, // Thời gian animation (ms)
  easing: "ease-in-out", // Hiệu ứng chuyển động
  once: false, // Chạy một lần khi cuộn
});
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Intro from "./pages/User/Web/Intro";
import TestEmotion from "./pages/User/Web/TestEmotion";
function App() {
  return (
    <>
      {/* <TokenValidator> */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/intro" />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/home" element={<TestEmotion />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
