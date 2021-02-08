//dependencies
import React, { useEffect, useState } from "react";
import API from "../utils/API";
import ProjectTable from '../components/Project/ProjectTable'

const Projects = () => {



        //Setting component's initial state
        const [projects, setProjects] = useState()

        //Load all of the projects and store them with setProjects
        useEffect(() => {
            loadProjects()
        }, [])
        
        //Loads all projects and sets them to projects
        function loadProjects(){
            API.getProjects()
                .then(res => {
                    setProjects(res.data)
                })
                .catch(err => console.log(err))
        }



    return (
        <>
        <div className="row">
            <div className="col s12">
                <h1>projects</h1>
                </div>
        </div>
        <div className="row">
            <div className="col s12">
                {projects ?
                <ProjectTable
                projects={projects}
                /> 
                : ""}

            </div>
        </div>
        </>
    )
}

export default Projects