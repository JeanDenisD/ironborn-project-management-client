import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProjectPage.css"

function EditProjectPage(props) {

    const navigate = useNavigate();

    const {projectId} = useParams();

    const projectDetails = props.projects.find( project => project._id === projectId); // get the details of the project that we're trying to edit

    const [title, setTitle] = useState(projectDetails.title);
    const [description, setDescription] = useState(projectDetails.description);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title,
            description,
        }

        const storedToken = localStorage.getItem('authToken');

        axios.put(
            `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
            newDetails,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                props.callBackUpdateProjectsList()
                navigate("/projects"); // redirect to project list
                // navigate(`/projects/${response.data._id}`); // redirect to project page
            })
            .catch(e => console.log("error updating project...", e));
    }

    return (
        <section className="EditProjectPage">
            <h1>Edit</h1>

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


                <button type="submit">Update</button>

            </form>

        </section>
    )
}

export default EditProjectPage;