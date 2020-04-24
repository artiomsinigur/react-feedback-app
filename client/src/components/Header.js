import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
    renderContent() {
        if (this.props.auth === null) {
            return // Nothing to show. So skip it
        } else if (this.props.auth === false) {
            return <li><a href="/auth/google">Login with Google</a></li>
        } else {
            return <li><a href="/api/logout">Logout</a></li>
        }
    }

    render() {
        console.log(this.props)
        return (
            <Fragment>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Feedback</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
            </Fragment>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header)