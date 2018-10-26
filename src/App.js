import React, { Component } from "react";
import List from "./component/List";
import Login from "./Auth/Login";

import { Container, Row, Col } from "reactstrap";

// Firebase
import firebase from "./Config/FireConfig";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.user = {
      email: "XXX",
      password: "YYY"
    };
    this.state = {
      user: this.user
    };
  }

  logout() {
    firebase.auth().signOut();
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  login(user) {
    console.log("In Parent user:" + user);
    this.setState({ [this.state]: user });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="12">
              <div>
                {this.state.user ? (
                  <div>
                    {" "}
                    <List />{" "}
                  </div>
                ) : (
                  <Login />
                )}
              </div>
            </Col>
            <Col xs="6" />
          </Row>
          <input type="submit" value="Sign out" onClick={this.logout} />
        </Container>
      </div>
    );
  }
}
export default App;
