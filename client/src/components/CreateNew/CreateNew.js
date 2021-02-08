import React, { useState } from "react";
import API from "../../utils/API";
import { Input, SubmitBtn } from "../../components/Form";


const CreateNew = () => {
    //setting component's initial state
    // const [projects, setProjects] = useState([])
    const [projectFormObject, setProjectFormObject] = useState({
        project: ""
    })

    //handles updating component state when use types into the input field
    function handleInputChange(event){
        const { name, value } = event.target;
        setProjectFormObject({...projectFormObject, [name]: value})
    };

    //when the form is submitted, use API.addProject method to save the project data
    //then navigate to the projects page and load all of the projects
    function handleProjectFormSubmit(event) {
        event.preventDefault()

            API.addProject({
                project: projectFormObject.project
            })
                .then(() => setProjectFormObject({
                    project: ""
                }))
                .then(window.location.href='/projects')
                .catch(err => console.log(err))
        
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>project name</label>
                        <Input
                        onChange={handleInputChange}
                        name="project"
                        type="text"
                        className="form-control"
                        id="project"
                        required
                        value={projectFormObject.project}
                        />
                    </div>
                </div>
            </div>
            <SubmitBtn
            type="button"
            className="btn btn-dark btn-lg btn-block"
            onClick={handleProjectFormSubmit}
            >create project</SubmitBtn>
        </>
    )
}

export default CreateNew