import axios from "axios";
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage';
import { useEffect, useState } from "react";
import AddProjectPage from "./pages/AddProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetchProjects()
  }, []);

  const fetchProjects = () => {

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        setProjects(response.data);
      })
      .catch(e => console.log("error getting projects from API...", e))
  }

  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route path='/' element={<h1>Welcome</h1>} />
        <Route
          path='/projects'
          element={
          <ProjectListPage projects={projects} callBackUpdateProjectsList={fetchProjects} />
          }
        />

        <Route
          path='/projects/create'
          element={
            <IsPrivate>
              <AddProjectPage callBackUpdateProjectsList={fetchProjects} />
            </IsPrivate>}
        />

        <Route
          path='/projects/:projectId/edit'
          element={
            <IsPrivate>
              <EditProjectPage projects={projects} callBackUpdateProjectsList={fetchProjects} />
            </IsPrivate>}
        />
        <Route
          path='/projects/:projectId'
          element={
            <IsPrivate>
              <ProjectDetailsPage projects={projects} callBackUpdateProjectsList={fetchProjects} />
            </IsPrivate>}
        />

        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
