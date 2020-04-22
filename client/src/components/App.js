import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

export default function App() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Header />
                    </Route>
                    <Route exact path="/service">
                        <Service />
                    </Route>
                    <Route path="/service/dev">
                        <Item />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route>
                        <NoPageFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

function Header() {
    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/service">Service</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <h1>Header page</h1>
        </nav>
    )
}

function Service() {
    return (
        <h1>Service page</h1>
    )
}

function Item() {
    return (
        <h1>React Super Hero</h1>
    )
}

function Contact() {
    return (
        <h1>Contact page</h1>
    )
}

function NoPageFound() {
    return (
        <h1>No page found</h1>
    )
}