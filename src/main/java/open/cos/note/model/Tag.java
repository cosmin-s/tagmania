package open.cos.note.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Tag {
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;

	@ManyToMany(mappedBy="tags",
			cascade = CascadeType.PERSIST)
	@JsonIgnore
	private List<Note> notes;
	
	@Column(name="NAME")
	private String name;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonIgnore
	public List<Note> getNotes() {
		return notes;
	}

	@JsonIgnore
	public void setNotes(List<Note> notes) {
		this.notes = notes;
	}

}
