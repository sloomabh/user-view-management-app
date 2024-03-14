import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
//import Resetpassword from "./pages/Resetpassword";
//import Forgotpassword from "./pages/Forgotpassword";
import SignUp from "./pages/SignUp";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import ViewUser from "./pages/ViewUser";
import AddEditUser from "./pages/AddEditUser";
import Roles from "./pages/Roles";
import AddEditRole from "./pages/AddEditRole";
import NoMatch from "./pages/NoMatch";
import { Helmet } from "react-helmet";

function App() {
  return (
    <Router>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/home" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="user-list" element={<Users />} />
          <Route path="user-list/:id" element={<ViewUser />} />
          <Route path="user/:id" element={<AddEditUser />} />
          <Route path="user" element={<AddEditUser />} />
          <Route path="role-list" element={<Roles />} />
          <Route path="role/:id" element={<AddEditRole />} />
          <Route path="role" element={<AddEditRole />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
