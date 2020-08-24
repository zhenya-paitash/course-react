import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    searchTerm: ''
  };

  onSearchChange = (e) => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    this.props.onSearchChange(searchTerm)
  };

  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="type to search"
             onChange={this.onSearchChange}
             value={this.state.searchTerm}
      />
    )
  }
}
