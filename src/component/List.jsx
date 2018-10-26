import React, { Component } from "react";
import Modal from "./Modal";
import AddCurr from "./AddCurr";

import fire from "../Config/FireConfig";

class List extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.addCurrency = this.addCurrency.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      currencies: [],
      requiredItem: 0
    };

    this.database = fire
      .database()
      .ref()
      .child("test");
  }

  componentWillMount() {
    const previousCurrencies = this.state.currencies;

    // DataSnapshot
    this.database.on("child_added", snap => {
      previousCurrencies.push({
        id: snap.key,
        date: snap.val().date,
        currency: snap.val().currency,
        value: snap.val().value,
        msg: snap.val().msg
      });

      this.setState({
        currencies: previousCurrencies
      });
    });

    this.database.on("child_removed", snap => {
      for (var i = 0; i < previousCurrencies.length; i++) {
        if (previousCurrencies[i].id === snap.key) {
          previousCurrencies.splice(i, 1);
        }
      }

      this.setState({
        currencies: previousCurrencies
      });
    });
  }

  addCurrency(cur, val, msg) {
    const previousCurrencies = this.state.currencies;
    this.database.push().set({
      id: previousCurrencies.length + 1,
      date: new Date().toDateString(),
      currency: cur,
      value: val,
      msg: msg
    });
  }

  replaceModalItem(index) {
    //debugger;
    this.setState({
      requiredItem: index
    });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempcurrencies = this.state.currencies;
    tempcurrencies[requiredItem] = item;
    this.setState({ [this.state.currencies]: tempcurrencies });

    var temp = {};
    temp = {
      currency: item.currency,
      date: item.date,
      id: requiredItem,
      msg: item.msg,
      value: item.value
    };

    fire
      .database()
      .ref()
      .child("test/")
      .child(item.id)
      .update(temp);
  }

  deleteItem(index) {
    if (window.confirm("Are you sure you want to delete?")) {
      fire
        .database()
        .ref()
        .child("test")
        .child(index)
        .remove()
        .catch(error => {
          return error;
        });
    } else {
      // Do nothing!
    }
  }

  render() {
    const currencies = this.state.currencies.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.currency}</td>
          <td>{item.value}</td>
          <td>{item.msg}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => this.replaceModalItem(index)}
            >
              edit
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() => this.deleteItem(item.id)}
            >
              remove
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.currencies[requiredItem];
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>The rate of currencies</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Currency</th>
              <th>Value</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>{currencies ? currencies : null}</tbody>
        </table>
        {modalData ? (
          <Modal
            id={modalData.id}
            date={modalData.date}
            currency={modalData.currency}
            value={modalData.value}
            msg={modalData.msg}
            saveModalDetails={this.saveModalDetails}
          />
        ) : null}

        <div className="currFooter">
          <AddCurr addCurrency={this.addCurrency} />
        </div>
      </div>
    );
  }
}

export default List;
