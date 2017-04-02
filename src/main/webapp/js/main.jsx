import React from 'react';
import ReactDOM from 'react-dom';
import SearchNotes from 'SearchNotes';
import AddNote from 'AddNote';
import { Router, Route, Link } from 'react-router';
import { hashHistory } from 'react-router';

ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={SearchNotes}>

    </Route>
    <Route path="add" component={AddNote} />
  </Router>
), document.getElementById('main'))
