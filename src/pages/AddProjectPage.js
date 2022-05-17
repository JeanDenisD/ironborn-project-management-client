import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProjectPage.css"

function AddProjectPage(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProject = {
            title,
            description,
        }

        axios.post(process.env.REACT_APP_API_URL + "/projects", newProject)
            .then(response => {
                props.callBackUpdateProjectsList()
                navigate("/projects"); // redirect to project list
                // navigate(`/projects/${response.data._id}`); // redirect to project page

                // clear form...
                setTitle("");
                setDescription("");
            })
            .catch(e => console.log("error creating project...", e));

    }

    return (
        <section className="AddProjectPage">
            <h1>Create a new project</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        name="title"
                        value={title}
                        required={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label>
                    Description
                    <input
                        type="text"
                        name="description"
                        value={description}
                        required={true}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>


                <button type="submit">Create project</button>

            </form>

        </section>
    )
}

export default AddProjectPage;