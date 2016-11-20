package open.cos.note.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import open.cos.note.dao.JpaNoteRepository;
import open.cos.note.model.Note;

@RestController
@RequestMapping("/note")
public class NoteResource {
	
	@Autowired
	JpaNoteRepository jpaNoteRepository;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<Note> getNotesByTag(@RequestParam String tag){
		return jpaNoteRepository.getNotesByTag(tag);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public void createNote(@RequestBody Note note){
		jpaNoteRepository.createNote(note);
	}

}
