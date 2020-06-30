import React, { Component } from "react";
import RegisterContainer from "./RegisterContainer";
import Header from "./Header";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location
        };
    }
    render() {
        return (
            <div className="container">
                <Header token={this.state.token} />
                <RegisterContainer redirect={this.state.redirect} />
            </div>
        );
    }
}

export default Register;
