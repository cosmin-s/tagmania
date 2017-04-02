import flux from 'control';
import NoteActions from 'NoteActions';

class MainStore {
  constructor() {
    this.entity = {};
    
    this.bindAction(NoteActions.loaded, this.onEntityLoaded);
    
  }

  onEntityLoaded(response) {
    this.entity = response.data ;
  }
}

module.exports =flux.createStore(MainStore, 'MainStore'); 