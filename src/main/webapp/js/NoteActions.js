import flux from 'control';
import axios from 'axios';

class NoteActions {
  constructor() {
    this.generateActions(
      'loaded'
      );
  }

  load(tag) {
    
    /*NoteService.load(noteID)
      .then((note) => {
        this.actions.loaded(note);
      }).catch((error) => {
        this.actions.loadFailed(error);
      }
    );*/
    var actionCreator = this;
    axios.get('/note?tag='+tag)
	  .then(function (note) {
	    actionCreator.actions.loaded(note);
        console.log(note);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
  }

}

module.exports = flux.createActions(NoteActions);