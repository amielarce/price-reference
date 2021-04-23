import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";

export default class CategorySelect extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      defaultValue: this.props.defaultValue
    }
  }

  componentDidMount() {
    //this.setState({defaultValue: this.props.defaultValue});
  }

  handleChange(newValue) {
    if (newValue) this.props.onChange(newValue.value);
  }

  handleInputChange(inputValue) {
    console.log(inputValue);
  }

  render() {
    console.log(this.props.options);
    console.log(this.props.defaultValue);
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={this.props.options}
        defaultValue={this.props.defaultValue}
      />
    );
  }
}
