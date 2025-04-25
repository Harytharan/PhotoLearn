import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import CreateLearningStatus from "./Pages/CreateLearningStatus";
import CreateLearningPlan from "./Pages/CreateLearningPlan";
import ActiveUsers from "./Pages/ActiveUsers";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/CreateLearningStatus" element={<CreateLearningStatus />} />
        <Route
          path="/CreateLearningStatus/:statusId"
          element={<CreateLearningStatus />}
        />
        <Route path="/CreateLearningPlan" element={<CreateLearningPlan />} />
        <Route
          path="/CreateLearningPlan/:LearningPlanId"
          element={<CreateLearningPlan />}
        />
        <Route path="/active-users" element={<ActiveUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
