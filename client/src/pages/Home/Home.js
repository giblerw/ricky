//dependencies
import React from 'react'
import homeImage from './homeImage2.png'
import './styles.css'


const Home = () => {
    return (
        <>
        <img id="homeImage" className="img-fluid" src={homeImage} alt="homeImage"/>
        </>
    )
}

export default Home