import React, { Component } from "react";
import "./AddCurr.css";

class AddCurr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "",
      value: "",
      msg: ""
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleMsg = this.handleMsg.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.writeCurr = this.writeCurr.bind(this);
  }

  // When the user input changes, set the newNoteContent
  // to the value of what's in the input box.
  handleCurrency(e) {
    this.setState({
      currency: [e.target.value] // the value of the text input
    });
  }
  handleValue(e) {
    this.setState({
      value: e.target.value // the value of the text input
    });
  }
  handleMsg(e) {
    this.setState({
      msg: e.target.value // the value of the text input
    });
  }

  handleUserInput(e) {
    this.setState({
      [e.target.name]: e.target.value // the value of the text input
    });
  }

  writeCurr() {
    this.props.addCurrency(
      this.state.currency,
      this.state.value,
      this.state.msg
    );
  }

  render() {
    return (
      <div className="formWrapper">
        <input
          type="text"
          className="currInput"
          placeholder="New Currency"
          value={this.state.currency}
          onChange={this.handleCurrency}
        />
        <br />
        <input
          type="text"
          className="currInput"
          placeholder="Value in Crown"
          value={this.state.value}
          onChange={this.handleValue}
        />
        <br />
        <input
          type="text"
          className="currInput"
          placeholder="Message"
          value={this.state.msg}
          onChange={this.handleMsg}
        />
        <button className="currButton" onClick={this.writeCurr}>
          Add Currency
        </button>
      </div>
    );
  }
}

export default AddCurr;
