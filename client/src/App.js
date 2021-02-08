import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"

//pages
import Home from './pages/Home/Home'
import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import ResumeProject from './pages/ResumeProject'
import RecordPage from './pages/RecordPage'
import ViewData from './pages/ViewData'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import AdditionalSpeciesPage from './pages/AdditionalSpecies'
import Edit from './pages/Edit'


//components
import Navbar from './components/Navbar/index'


//css
import './App.css'

function App() {
  return (
    <Router>
      <Navbar/>
    <div className="container">
      <Switch>
      <Route exact path="/">
        {<Home
        className='home'

        />}
      </Route>
      <Route exact path="/projects">
        {<Projects />}
      </Route>
      <Route exact path="/create">
        {<CreateProject />}
      </Route>
      <Route exact path="/resume/:_id">
        {<ResumeProject />}
      </Route>
      <Route exact path="/edit/:_id">
        {<Edit />}
      </Route>
      <Route exact path="/record/:_id">
        {<RecordPage />}
      </Route>
      <Route exact path="/additional/:_id">
        {<AdditionalSpeciesPage />}
      </Route>
      <Route exact path="/data/:_id">
        {<ViewData />}
      </Route>
      <Route exact path="/login">
        {<Login />}
      </Route>
      <Route exact path="/register">
        {<Register />}
      </Route>
      <Route exact path="/about">
        {<About />}
      </Route>
      <Route path="/*">
        {<NotFound />}
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
