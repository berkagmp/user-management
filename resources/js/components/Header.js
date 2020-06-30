import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        };
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        let state = localStorage["appState"];
        if (state) {
            this.setState({
                token: JSON.parse(state).token
            });
        }
        
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        axios
            .post("/api/auth/logout", null, config)
            .then(response => {
                console.log(response);
                
                let appState = {
                    token: ""
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState(appState);
                this.props.history.push("/login");
            })
            .catch(error => {
                console.log(error);
            });
        
    }
    render() {
        return (
                <ul className="nav justify-content-center">
                    {this.state.token ? (
                        <li className="nav-item">
                            <Link to="/">User List</Link> |{" "}
                            <a href="#" onClick={this.logOut}>Logout</a>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link to="/login">Login</Link> |{" "}
                            <Link to="/register">Register</Link>
                        </li>
                    )}
                </ul>
        );
    }
}
export default withRouter(Header);
