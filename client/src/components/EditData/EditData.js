//dependencies
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import API from "../../utils/API";
import Table from './Table'
import MaterialTable from 'material-table'
import {SubmitBtn} from '../Form/SubmitBtn'


const EditProjectData = () => {

    //get _id param (transectID) so that it can be accessed to for displaying data and for adding transect name
    const { _id } = useParams()


    //setting component's initial state
    //hook for state where project title is displayed
    const [project, setProject] =useState([])
    //hook for table data
    const [data, setData] = useState([]);
    //hook for updatedData
    const [updatedData, setUpdatedData] = useState([]);


    //display the project title once the component mounts
    useEffect(() => {
        //GET Method for pulling project name
        API.getProjectByID(_id)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    //create the empty array for table data to be stored in
    const tableDataArr = []

    //format the project's data to display in the table
    useEffect(() => {
        //Get method for pulling data by project ID
        API.getProjectData(_id)
        .then(res => {
            let tableTransects = res.data.transects
            class TableData {
                constructor(transect, date, latitude, longitude, elevation, crew, additionalSpecies, point, ground_surface, soil_moisture_percentage, shrub_density_detail, canopy_score, canopy_taxa, hit_one, hit_two, point_id, transect_id, project_id){
                    this.transect = transect;
                    this.date = date;
                    this.latitude = latitude;
                    this.longitude = longitude;
                    this.elevation = elevation;
                    this.crew = crew;
                    this.additionalSpecies = additionalSpecies;
                    this.point = point;
                    this.ground_surface = ground_surface;
                    this.soil_moisture_percentage = soil_moisture_percentage;
                    this.shrub_density_detail = shrub_density_detail;
                    this.canopy_score = canopy_score;
                    this.canopy_taxa = canopy_taxa;
                    this.hit_one = hit_one;
                    this.hit_two = hit_two;
                    this.point_id = point_id;
                    this.transect_id = transect_id;
                    this.project_id = project_id;

                }
            }
            tableTransects.forEach(tableTransect => {
                for (var j = 0; j < tableTransect.points.length; j++) {
                    tableDataArr.push(new TableData(
                        tableTransect.transect,
                        tableTransect.date,
                        tableTransect.latitude,
                        tableTransect.longitude,
                        tableTransect.elevation,
                        tableTransect.crew,
                        tableTransect.additionalSpecies,
                        tableTransect.points[j].point,
                        tableTransect.points[j].ground_surface,
                        tableTransect.points[j].soil_moisture_percentage,
                        tableTransect.points[j].shrub_density_detail,
                        tableTransect.points[j].canopy_score,
                        tableTransect.points[j].canopy_taxa,
                        tableTransect.points[j].hit_one,
                        tableTransect.points[j].hit_two,
                        tableTransect.points[j]._id,
                        tableTransect._id,
                        _id
                        ))
                }
            })
            //console.log(tableDataArr)
            setData(tableDataArr)
        })
        .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])



    //function to send the updates to the database via API
        //when the form is submitted, use API.addPoint method to save the project data
        //then navigate to the projects page
        function handleUpdateSubmit(event) {
            event.preventDefault(updatedData)
                console.log(updatedData)
                API.updateProjectData({
                    updatedData: updatedData
                })
                .then(res => {
                })
                    .catch(err => console.log(err))
        
    };
    

    return (
        <>
            <Table
                id={project._id}
                project={project.project}
                data={data}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            setUpdatedData(dataUpdate)
                            //console.log(dataUpdate)
                            resolve();
                        }, 1000)
                      })

                  }}
            
            />
            <br></br>
            <div>
                <SubmitBtn
                    onClick={handleUpdateSubmit}
                >
                    submit changes to database
                </SubmitBtn>
            </div>
        </>
    )
}

export default EditProjectData