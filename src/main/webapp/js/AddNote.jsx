import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Moment from 'moment';
import TagList from 'tag/TagList';

const AddNote = React.createClass({

	getInitialState: function() {
    return {
      items: []
    };
  },

	handleSave() {

		const tagList = this.state.items.map((tag) => 
			{return {name:tag.text};}
		);

		axios.post('/note',{
			content:this.refs.content.value,
			title:'test',
			date: Moment().format('YYYY-MM-DD'),
			tags:tagList
		})
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	},

	handleAdd(item) {

    var itemArray = this.state.items;
   
    itemArray.push(
      {
        text: item,
        key: Date.now()
      }
    );
 
    this.setState({
      items: itemArray
    });
 
    //this.refs.item.value = "";
 
    //e.preventDefault();
		
	},

  render() {
    return (
			<div>
				<Link to="/">Home</Link>
        <div>
      	   <textarea ref="content" className="add-form-content"></textarea>
        </div>
        <div>
        	<TagList handleAddItem={this.handleAdd} items={this.state.items}/>
        </div>
        <div>
          <button className="add-form-btn" onClick={this.handleSave}>Save</button>
					
        </div>
			</div>
    );
  }

});
export default AddNote;
