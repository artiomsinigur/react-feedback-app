import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Header from './Header'
import { connect } from 'react-redux'
import * as actions from '../actions'

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser()
    }
    
    render () {
        return (
            <div className="container">
                <Router>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/">
                                <Landing />
                            </Route>
                            <Route exact path="/survey">
                                <Dashboard />
                            </Route>
                            <Route path="/survey/new">
                                <NewSurvey />
                            </Route>
                            <Route>
                                <NoPageFound />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default connect(null, actions)(App)

// function Header() {
//     return (
//         <nav>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/survey">Surveys</Link></li>
//             <li><Link to="/survey/new">Create survey</Link></li>
//         </nav>
//     )
// }

function Landing() {
    return (

        <h1>Landing page</h1>
    )
}

function Dashboard() {
    return (
        <h1>Dashboard page</h1>
    )
}

function NewSurvey() {
    return (
        <h1>NewSurvey page</h1>
    )
}

function NoPageFound() {
    return (
        <h1>No page found</h1>
    )
}