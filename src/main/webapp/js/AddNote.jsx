import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Moment from 'moment';
import TagList from 'tag/TagList';

const AddNote = React.createClass({

	getInitialState: function() {
    return {
      items: [],
      noteItems:[]
    };
  },

	handleSave() {

		const tagList = this.state.items.map((tag) => 
			{return {name:tag.text};}
		);
    const itemList = this.state.noteItems.map((noteItem) => 
			{
        return {
            value:noteItem.text,
            done:false
          };
        }
		);

		axios.post('/note',{
			items:itemList,
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

  handleAddNoteItem(noteItem){
    var itemArray = this.state.noteItems;
   
    itemArray.push(
      {
        text: noteItem,
        key: Date.now()
      }
    );
 
    this.setState({
      noteItems: itemArray
    });
  },

  render() {
    return (
			<div>
				<Link to="/">Home</Link>
        <div className="add-form">
          <div>
            Note items
          </div>
          <div>
            <TagList handleAddItem={this.handleAddNoteItem} items={this.state.noteItems}/> 
          </div>
          <div>
            Tags
          </div>  
          <div>
            <TagList handleAddItem={this.handleAdd} items={this.state.items}/>
          </div>
          <div>
            <button className="add-form-btn" onClick={this.handleSave}>Save</button>
            
          </div>
        </div>
			</div>
    );
  }

});
export default AddNote;
