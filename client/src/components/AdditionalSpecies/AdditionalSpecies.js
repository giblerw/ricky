//dependencies
import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { SubmitBtn } from "../../components/Form";
import {useHistory, useParams } from 'react-router-dom'
import RecordTransectName from "../RecordData/RecordTransectName"
import { HitInputSelect } from "../RecordData/HitInputSelect"

const AdditionalSpecies = () => {

        //get _id param (transectID) so that it can be accessed to for displaying data and for adding transect name
        const { _id } = useParams()

        const history = useHistory()

        //hook for state where transect name is displayed
        const [transect, setTransect] =useState([])

        //use the species list for the dropdowns and display the transectName on the page once the component mounts 
        useEffect(() => {
            //GET Method for pulling transect name
            API.getTransectById(_id)
            .then(res => {
                setTransect(res.data)
            })
            .catch(err => console.log(err))
        }, [])
        
        //hook for state of second hits values (array of names)
        const [additionalTaxa, setAdditionalTaxa] = useState([])
        //hook for state of second hits input field
        const [additionalTaxaInput, setAssitionalTaxaInput] = useState("")

        //function to add the value in the input field to the to the list of second hit values
        const handleAdditionalTaxaSumbit = () => {
            if (additionalTaxaInput.length > 0) {
                setAdditionalTaxa(additionalTaxa => [...additionalTaxa, additionalTaxaInput])
                //setSecondHits(secondHits => secondHits.concat(secondHitInput))
                setAssitionalTaxaInput("")
            }
        }
        
        //function to update the secondHitInput as user types
        function updateAdditionalTaxaInput({ target }) {
            setAssitionalTaxaInput(target.value);
        }

        //have enter key submit value - not working with hitlist data list, but ok for now
        const keyPressed = ({ key }) => {
            if (key === "Enter") {
                handleAdditionalTaxaSumbit()
            }
        }

        
        const submitAdditionalTaxaHandler = e => {
            // Prevent form submission on Enter key
            e.preventDefault()
        }

        //component ----maybe should save in abother file, but gotta figure out props
        const Search = ({ additionalTaxaInput }) => <li>{additionalTaxaInput}</li>


        //when the form is submitted, use API.addPoint method to save the project data
        //then navigate to the projects page
        function handleAdditionalTaxaSubmitEnd(event) {
            event.preventDefault()
                console.log(additionalTaxa)
                API.updateTransectById({
                    additionalSpecies: additionalTaxa,
                    transectID: _id
                })
                .then(res => {
                    //add the desired route that I want to naviagte to to the end of the history array, thus making it the current page
                    history.push(`/projects`)
                })
                    .catch(err => console.log(err))
        
    };






        return(
            <>
            <div className="row">
                <div className="col">
                    <RecordTransectName
                        id={transect._id}
                        transect={transect.transect}
                    />
                </div>
            </div>
            <h4>add additional taxa within 1m of transect</h4>
            <div className="form-group">
                    <ul>
                        {additionalTaxa.map((additionalTaxaInput, i) => (
                            <Search
                            additionalTaxaInput={additionalTaxaInput}
                                key={additionalTaxaInput + i}
                            />
                        ))}
                    </ul>
                    <form className="form-inline" onSubmit={submitAdditionalTaxaHandler}>
                        <HitInputSelect
                            className="form-control"
                            type="text"
                            onChange={updateAdditionalTaxaInput}
                            onKeyPress={keyPressed}
                            value={additionalTaxaInput}
                        />
                        <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={handleAdditionalTaxaSumbit}
                        >
                            +
                        </button>
                    </form>
            </div>
            <div className="row">
            <div className="col-4">
                <SubmitBtn
                    onClick={handleAdditionalTaxaSubmitEnd}
                >
                    submit and end transect
                </SubmitBtn>
            </div>
        </div>
            </>
        )
}

export default AdditionalSpecies