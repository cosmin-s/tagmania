import React from 'react';

const TagList = React.createClass({

getInitialState: function() {
    return {
      items: []
    };
  },
/*
	handleAdd(item) {

    var itemArray = this.state.items;
   
    itemArray.push(
      {
        text: this.refs.item.value,
        key: Date.now()
      }
    );
 
    this.setState({
      items: itemArray
    });
 
    this.refs.item.value = "";
 
    //e.preventDefault();
		
	},
*/
  handleAdd() {
    this.props.handleAddItem(this.refs.item.value);
    this.refs.item.value = "";
  },

  render() {
    const list = this.props.items instanceof Array ? this.props.items.map((tag) => 
			<span className="add-form-tag-item">{tag.text}</span>
		) : '';
    return (
		<div>
        <input ref="item" type="text" className="add-form-tag"></input>        
        <button className="" onClick={this.handleAdd}>[+]</button>
        <div className="add-form-tag-list">{list}</div>
		</div>
    );
  }

});
export default TagList;
