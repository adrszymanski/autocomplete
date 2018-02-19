import React, { Component } from 'react';

class AutocompleteItem extends Component {
  render() {
    return (
      <li className="AutocompleteItem" onClick={this.props.clickHandler}>
        {this.props.item.value}
      </li>
    );
  }
}

export default AutocompleteItem;
