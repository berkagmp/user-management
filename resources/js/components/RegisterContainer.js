import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import FlashMessage from "react-flash-message";

class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            error: "",
            formSubmitting: false,
            user: {
                user_id: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: "",
                is_admin: 0
            },
            redirect: props.redirect
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ token: AppState.token });
        }
        if (this.state.token) {
            return this.props.history.push("/");
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
        ReactDOM.findDOMNode(this).scrollIntoView();
        let userData = this.state.user;

        axios
            .post("/api/auth/register", userData)
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
                        token: appState.token
                    });

                    location.reload();
                } else {
                    console.log("ERROR");
                }
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMessage: "Something Went Wrong. Please check your information",
                    formSubmitting: false
                });
            })
            .finally(this.setState({ error: "" }));
    }

    handleInputChange(event) {
        const target = event.target;
        const value =
            target.name === "is_admin" ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
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
                                    Registration successful
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
                                    id="user_id"
                                    type="text"
                                    name="user_id"
                                    placeholder="User ID"
                                    className="form-control"
                                    required
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    className="form-control"
                                    required
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    className="form-control"
                                    required
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    className="form-control"
                                    required
                                    onChange={this.handleInputChange}
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
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    required
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="input-group-text">
                                    <input
                                        id="is_admin"
                                        type="checkbox"
                                        name="is_admin"
                                        placeholder="Admin"
                                        onChange={this.handleInputChange}
                                    />
                                    &nbsp;&nbsp;&nbsp;Admin
                                </div>
                            </div>
                            <button
                                type="submit"
                                name="singlebutton"
                                className="btn btn-primary btn-lg  btn-block mb10"
                                disabled={
                                    this.state.formSubmitting ? "disabled" : ""
                                }
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterContainer);
