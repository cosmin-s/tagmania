import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Moment from 'moment';

const AddNote = React.createClass({

	handleSave() {
		axios.post('/note',{
			content:this.refs.content.value,
			title:'test',
			date: Moment().format('YYYY-MM-DD'),
			tags:[{
				name:this.refs.tag.value
			}]
		})
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	},

  render() {
    return (
			<div>
        <div>
      	   <textarea ref="content"></textarea>
        </div>
        <div>
          <input ref="tag" type="text"></input>
        </div>
        <div>
          <button onClick={this.handleSave}>Save</button>
        </div>
			</div>
    );
  }

});
export default AddNote;
