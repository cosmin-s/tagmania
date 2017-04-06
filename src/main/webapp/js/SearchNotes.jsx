import React from 'react';

import { Link } from 'react-router';
import NoteActions from 'NoteActions';
import ListenerMixin from 'alt/mixins/ListenerMixin';

import MainStore from 'MainStore';

function getStateFromStores() {
  return {
    entity: MainStore.getState().entity,
  };
}

const SearchNotes = React.createClass({

	mixins: [ListenerMixin],

	getInitialState(){
		return getStateFromStores();
	},

	componentWillMount() {
    this.listenTo(MainStore, this.onChange);
  },

	onChange() {
    this.setState(getStateFromStores());
  },

	handleSearch() {
		/*
		axios.get('/note?tag='+this.refs.tag.value)
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });*/
		NoteActions.load(this.refs.tag.value);
	},

  render() {
		const list = this.state.entity instanceof Array ? this.state.entity.map((note) => 
			<li>{note.items.map(item=>item.value+"; ")}</li>
		) : '';
    return (
			<div>
      	<input type="text" ref="tag" className="search-form-input"></input>
				<button className="search-form-btn" onClick={this.handleSearch}>Search</button>
				<Link to="/add">[+]</Link>
				<ul>
					{list}
				</ul>
			</div>

    );
  }

});
export default SearchNotes;
