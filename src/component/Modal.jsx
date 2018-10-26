import React, { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.msgHandler = this.msgHandler.bind(this);
    this.valHandler = this.valHandler.bind(this);
    this.currHandler = this.currHandler.bind(this);
    /*this.state = {
      currencies: []
    };*/
    this.state = {
      id: "",
      currency: "",
      value: "",
      msg: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      date: nextProps.date,
      currency: nextProps.currency,
      value: nextProps.value,
      msg: nextProps.msg
    });
  }

  currHandler(e) {
    this.setState({ currency: e.target.value });
  }

  valHandler(e) {
    this.setState({ value: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  handleSave() {
    const item = this.state;
    this.props.saveModalDetails(item);
  }

  render() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Jewel
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <span className="modal-lable">Currency:</span>
                <input
                  value={this.state.currency}
                  onChange={e => this.currHandler(e)}
                />
              </p>
              <p>
                <span className="modal-lable">Value:</span>
                <input
                  value={this.state.value}
                  onChange={e => this.valHandler(e)}
                />
              </p>
              <p>
                <span className="modal-lable">Msg:</span>
                <input
                  value={this.state.msg}
                  onChange={e => this.msgHandler(e)}
                />
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  this.handleSave();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
