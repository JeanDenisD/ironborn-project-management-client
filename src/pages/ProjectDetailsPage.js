import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./EditProjectPage.css"

function EditProjectPage(props) {

    const navigate = useNavigate();

    const { projectId } = useParams();

    const projectDetails = props.projects.find(project => project._id === projectId); // get the details of the project that we're trying to edit

    const [title, setTitle] = useState(projectDetails.title);
    const [description, setDescription] = useState(projectDetails.description);
    const [tasks, setTasks] = useState(projectDetails.tasks);

    console.log(projectDetails)

    return (
        <section key={projectId}>
            <h3>Title: {title}</h3>
            <h3>Description: {description}</h3>
            <ol>
                {tasks.map((task) => {
                    return (
                        <li>
                            <ul>
                                <li>{task.title}</li>
                                <li>{task.description}</li>
                            </ul>
                        </li>
                    )
                })}
            </ol>

            <NavLink to={`/projects/${projectId}/edit`}>Edit</NavLink>

        </section>
    )
}

export default EditProjectPage;