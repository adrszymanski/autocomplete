import React, { Component } from 'react';
import AutocompleteItem from './AutocompleteItem';
import './Autocomplete.css';

/**
<--- Autocomplete control --->
  Props required:

  @property allItems {Array} - array of item for populating autocomplete list.
    Every item should have following properties:
     1. Value {String|Number} - value shown on the list, which can populate input
     2. Some other fields that we can use in search of item
  @property title {String|Number} Name of the label
  @property placeholder {String|Number} Name of the placeholder
  @property searchFields {Array} fields in item which we can use to find it on the list.

  Props optional:

  @property startValue {String|Number} Staring value for input
**/
class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.allItems = this.props.allItems;
        // last clicked element
        this.currentElement = null;
        this.state = {
            items: [],
            value: this.props.startValue || ''
        };
    }
    render() {
        let iterator = 0;
        let items = this.state.items.map(item => {
            return <AutocompleteItem key={`option-${iterator++}`} clickHandler={this.handleItemClick.bind(this)} item={item} />
        });
        return (
                <div className="Autocomplete form-container" onMouseDown={this.handleMouseDown.bind(this)}>
                  <label>
                    {this.props.title}
                  </label>
                  <input type="text" placeholder={this.props.placeholder} value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                      onBlur={this.handleFocusOut.bind(this)}
                      onKeyDown={this.handleKeyPress.bind(this)}
                  />
                  <ul className="suggestions">
                      {items}
                  </ul>
                </div>
                );
    }

    /*
    Function find matches in list of coutries that corresponds with input value.
    */
    findMatchedItems(word) {
      const filteredItems = this.allItems.filter(item => {
        const validRegexp = new RegExp('^\\w+$');
        if (word.match(validRegexp, 'i')) {
          const regexp = new RegExp(`^${word}\\w*$`, 'i');
          let flag = false;
          this.props.searchFields.forEach(fieldName => {
            if (item[fieldName].match(regexp, 'i')) {
              flag = true;
            }
          });
          return flag;
        }
        return false;
      });
      this.setState({items: filteredItems});
    }

    handleChange(event) {
        this.setState({value: event.target.value})
        this.findMatchedItems(event.target.value);
    }

    handleFocusOut(event) {
        // If we click on the autocomplete list we don't want to clear items.
        if (this.currentElement !== 'LI') {
          const index = this.allItems.findIndex(item => event.target.value === item.value);
          if(index === -1) {
            this.setState({
              value: '',
              items: []
            });
          }
       }
    }

    // Tab and Enter events
    handleKeyPress(event) {
      // Preventing tab to change focus.
      if (event.key === 'Tab') {
        event.preventDefault();
      }

      if(event.key === 'Tab' || event.key === 'Enter') {
        const firstItem= this.state.items[0];
        const value = firstItem.value;
        this.setState({value, items: []});
      }
    }

    // If we click list position, it will fill input with choosed item.
    handleItemClick(event) {
      this.setState({
        value: event.target.innerHTML,
        items: []
      });
    }

    // Keeping clicked element to not loose items if we blur input and our target is an item of the list.
    handleMouseDown(event) {
      this.currentElement = event.target.nodeName;
    }
};

export default Autocomplete;
