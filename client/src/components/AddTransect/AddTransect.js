//dependencies
import { GPSbtn } from "./GPSbtn"
import { Input, SubmitBtn } from "../../components/Form";
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import {useHistory, useParams } from 'react-router-dom'
import ResumeProjectName from './ResumeProjectName.js'


const AddTransect = () => {

    //get _id param so that it can be passed to the add transect page
    const { _id } = useParams()

    const history = useHistory()

    //setting component's initial state
    //hook for state where project title is displayed
    const [project, setProject] =useState([])
    //hook for state of transect info form
    const [transectFormObject, setTransectFormObject] = useState({
        transect: "",
        latitude: "",
        longitude: "",
        elevation: "",
        date: "",
        crew: "",
    })

    //display the project title once the component mounts
    useEffect(() => {
        //GET Method for pulling project name
        API.getProjectByID(_id)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    //handles updating component state when user types into the input field
    function handleInputChange(event){
        const { name, value } = event.target;
        setTransectFormObject({...transectFormObject, [name]: value})
    };

    //when the form is submitted, use API.addTransect method to save the project data
    //then navigate to the projects page and load all of the projects
    function handleTransectFormSubmit(event) {
        event.preventDefault()
            API.addTransect({
                transect: transectFormObject.transect,
                latitude: transectFormObject.latitude,
                longitude: transectFormObject.longitude,
                elevation: transectFormObject.elevation,
                date: transectFormObject.date,
                crew: transectFormObject.crew,
                projectID: _id //this is the project that I am adding the transect to
            })
            .then(res => {
                // destructure the response
                const { transects } = res.data
                //create variable transectID that is the last value from the res.data array (pop method)
                const transectId = transects.pop()
                //add the desired route that I want to naviagte to to the end of the history array, thus making it the current page
                history.push(`/record/${transectId}`)
            })
                .catch(err => console.log(err))
        
    };

    return (
        <>
        <ResumeProjectName
            id={project._id}
            project={project.project}
            />
        <form>
            <div className="form-group">
                <label>transect name</label>
                <Input name="transect" id="transect" className="form-control" onChange={handleInputChange}></Input>
            </div>



            <div className="form-group">
                <div className="row">
                    <div className="col-5">
                        <Input id="latitude" name="latitude" value={transectFormObject.latitude} className="form-control" placeholder="latitude" onChange={handleInputChange}></Input>
                    </div>
                    <div className="col-5">
                        <Input id="longitude" name="longitude" value={transectFormObject.longitude}  className="form-control" placeholder="longitude" onChange={handleInputChange}></Input>
                    </div>
                    <div className="col-2">
                        <GPSbtn
                            setGPS={setTransectFormObject}
                            stateGPS={transectFormObject}
                        />
                    </div>
                </div>
            </div>



            <div className="form-group">
                <label>elevation (m)</label>
                <Input id="elevation" name="elevation" className="form-control" type="number" min="0" onChange={handleInputChange}></Input>
            </div>
            <div className="form-group">
                <label>date</label>
                <Input id="date" name="date" className="form-control" type="date" onChange={handleInputChange}></Input>
            </div>
            <div className="form-group">
                <label>crew</label>
                <Input id="crew" name="crew" className="form-control" onChange={handleInputChange}></Input>

            </div>
                <SubmitBtn
                    onClick={handleTransectFormSubmit}
                    >start
                </SubmitBtn>
        </form>
        </>
    )
}

export default AddTransect