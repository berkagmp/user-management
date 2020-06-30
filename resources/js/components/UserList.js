import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FlashMessage from "react-flash-message";

import Header from "./Header";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            loading: false,
            users: []
        };
    }
    loadPermission = async () => {
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };

        axios
            .get("/api/detail", config)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.status == "success") {
                    this.setState({ is_admin: json.data.data.is_admin });
                }
            })
            .finally(this.setState({ error: "" }));
    };
    loadUsers = async () => {
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };

        axios
            .get("/api/users", config)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.status == "success") {
                    this.setState({ users: json.data.data });
                }
            })
            .finally(this.setState({ error: "" }));
    };
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({
                token: AppState.token
            });
        }
    }
    componentDidMount() {
        this.loadUsers();
        this.loadPermission();
    }

    render() {
        let errorMessage = this.state.errorMessage;
        const { users } = this.state;
        
        return (
            <div className="container">
                <Header token={this.state.token} />
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr align="center">
                                <td width="100">User ID</td>
                                <td width="300">Email</td>
                                <td width="200">First Name</td>
                                <td width="200">Last Name</td>
                                <td
                                    width="100"
                                    className={
                                        this.state.is_admin == 1 ? "" : "hidden"
                                    }
                                >
                                    Action
                                </td>
                            </tr>
                        </thead>
                        {users
                            ? users.map(user => (
                                  <User
                                      key={user.id}
                                      user={user}
                                      is_admin={this.state.is_admin}
                                      action={this.loadUsers}
                                  />
                              ))
                            : "Loading"}
                    </table>
                </div>
            </div>
        );
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            success: false,
            user: {
                id: this.props.user.id,
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ token: AppState.token });
        }
    }

    handleFirstName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                first_name: value
            }
        }));
    }
    handleLastName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                last_name: value
            }
        }));
    }
    handleSubmit(e) {
        e.preventDefault();
        let userData = this.state.user;

        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };

        axios
            .put("/api/users/" + userData.id, userData, config)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.status == "success") {
                    this.setState({ success: true });
                    setTimeout(() => {
                        this.setState({ show: false, success: false });
                        this.props.action();
                    }, 2000);
                } else {
                    console.log("ERROR");
                    throw new Error("Error");
                }
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false
                    });
                } else if (error.request) {
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    });
                } else {
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    });
                }
            })
            .finally(this.setState({ error: "" }));
    }
    editshow = () => {
        this.setState({ show: !this.state.show });
    };
    render() {
        return (
            <tbody>
                <tr>
                    <td>{this.props.user.user_id}</td>
                    <td>{this.props.user.email}</td>
                    <td>{this.props.user.first_name}</td>
                    <td>{this.props.user.last_name}</td>
                    <td className={this.props.is_admin == 1 ? "" : "hidden"}>
                        <button
                            className="btn btn-warning"
                            onClick={this.editshow}
                        >
                            {this.state.show ? "CLOSE" : "OPEN"}
                        </button>
                    </td>
                </tr>
                <tr className={this.state.show ? "" : "hidden"}>
                    <td colSpan="2" className="text-center">
                        Edit User Name
                        {this.state.success ? (
                            <FlashMessage
                                duration={3000}
                                persistOnHover={false}
                            >
                                <h5 className={"alert alert-success"}>
                                    Updated
                                </h5>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                    </td>
                    <td>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className="form-control"
                            required
                            defaultValue={this.props.user.first_name}
                            onChange={this.handleFirstName}
                        />
                    </td>
                    <td>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            className="form-control"
                            required
                            defaultValue={this.props.user.last_name}
                            onChange={this.handleLastName}
                        />
                    </td>
                    <td>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                        >
                            Update
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }
}

export default withRouter(UserList);
