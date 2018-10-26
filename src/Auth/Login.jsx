import React, { Component } from "react";
import fire from "../Config/FireConfig";

import { Jumbotron, Grid } from "react-bootstrap";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  signUp(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log(fire);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Grid>
        <Jumbotron>
          <h2>Welcome to Login page</h2>
          <p>This is where you log in</p>
        </Jumbotron>
        <div className="row">
          <div className="col-md-12">
            <form>
              <div className="from-group">
                <label>Email address</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label className="form-check-label">Check me out!</label>
                <button
                  onClick={this.login}
                  style={{ marginLeft: "25px" }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Log in
                </button>
                <button
                  onClick={this.signUp}
                  style={{ marginLeft: "25px" }}
                  type="submit"
                  className="btn btn-success"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </Grid>
    );
  }
}

export default Authentication;
