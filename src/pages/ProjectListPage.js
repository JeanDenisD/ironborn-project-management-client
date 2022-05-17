import axios from "axios";
import { NavLink } from "react-router-dom";
import "./ProjectListPage.css"


function ProjectListPage(props){
    const deleteProject = (projectId) =>{
        axios.delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
            .then(response =>{
                props.callBackUpdateProjectsList();
            })
            .catch(e=>console.log("Error deleting project in the DB",e))
    }

    const renderProjects = () => {
        const result = props.projects.map( (element) => {
            return (
                <div key={element._id} className="project-summary box">
                    <p>{element.title}</p>
                    <NavLink to="/">More details</NavLink> |&nbsp;
                    <NavLink to={`/projects/${element._id}/edit`}>Edit</NavLink> |&nbsp;
                    <a href="#" onClick={()=>{deleteProject(element._id)}}>Delete</a>
                </div>
            )
        });
        return result;
    }

    return (
        <div className="ProjectListPage">
            <h1>List of Projects</h1>

             <section>
                 { props.projects === null
                    ? <p>loading...</p>
                    : renderProjects()
                }
             </section>

        </div>
    );
}

export default ProjectListPage;