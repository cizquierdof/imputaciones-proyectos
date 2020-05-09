import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProjectList from '../pages/project/ProjectList'
import ProjectCreate from '../pages/project/ProjectCreate'
import ProjectView from '../pages/project/ProjectView'
import ClientList from '../pages/client/ClientList'
import Navbar from '../components/Navbar';
import ClientCreate from '../pages/client/ClientCreate'
import ClientView from '../pages/client/ClientView'
import Splash from '../pages/splash'


const Routes = () => {
    return (
        
        <Router>
            <Navbar/>
            <div className="ui container">
                <Route exact path="/" component={Splash} />
                <Route exact path="/projects" component={ProjectList} />
                <Route path="/projects/new" component={ProjectCreate} />
                <Route path="/projects/:id/view" component={ProjectView} />
                <Route path='/projects/:id/edit' component={ProjectCreate}/>
                <Route exact path='/clients' component={ClientList}/>
                <Route path="/clients/new" component={ClientCreate} />
                <Route path="/clients/:id/view" component={ClientView} />
                <Route path='/clients/:id/edit' component={ClientCreate}/>

            </div>
      </Router>
    )
}

export default Routes
