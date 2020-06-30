import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import FlashMessage from "react-flash-message";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            error: "",
            formSubmitting: false,
            redirect: props.redirect
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ token: AppState.token });
        }
    }
    componentDidMount() {
        const { prevLocation } = this.state.redirect.state || {
            prevLocation: { pathname: "/" }
        };
        if (prevLocation && this.state.token) {
            return this.props.history.push(prevLocation);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        let userData = this.state.user;
        axios
            .post("/api/auth/login", userData)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.status == "success") {
                    let appState = {
                        token: json.data.data.token
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        token: appState.token,
                        error: ""
                    });

                    location.reload();
                } else {
                    alert(`Our System Failed To Register Your Account!`);
                }
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMessage: "Something Went Wrong. Please check your credentials",
                    formSubmitting: false
                });
            })
            .finally(this.setState({ error: "" }));
    }
    handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: value
            }
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: value
            }
        }));
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        {this.state.token ? (
                            <FlashMessage
                                duration={60000}
                                persistOnHover={true}
                            >
                                <h5 className={"alert alert-success"}>
                                    Login successful
                                </h5>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                        {this.state.error ? (
                            <FlashMessage
                                duration={100000}
                                persistOnHover={true}
                            >
                                <h5 className={"alert alert-danger"}>
                                    {this.state.errorMessage}
                                </h5>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    className="form-control"
                                    required
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    required
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <button
                                disabled={this.state.formSubmitting}
                                type="submit"
                                name="singlebutton"
                                className="btn btn-primary btn-lg  btn-block mb10"
                            >
                                {" "}
                                {this.state.formSubmitting
                                    ? "Logging You In..."
                                    : "Log In"}{" "}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginContainer);
