package open.cos.note.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import open.cos.note.model.Note;
import open.cos.note.model.NoteItem;
import open.cos.note.model.Tag;

@Repository
public class JpaNoteRepository {
	
	@PersistenceUnit
	EntityManagerFactory entityManagerFactory;
	
	@SuppressWarnings("unchecked")
	public List<Note> getNotesByTag(String tag){
		return (List<Note>)(entityManagerFactory.createEntityManager().
			createQuery("SELECT n FROM Note n JOIN n.tags t WHERE t.name = :tag").setParameter("tag",
					tag).getResultList());
	}
	
	public void createNote(Note note){
		EntityManager em = entityManagerFactory.createEntityManager();
		try {
			em.getTransaction().begin();

			List<Tag> newTags = new ArrayList<Tag>();
			for (Tag tag : note.getTags()) {
				List<Tag> tags = getTagByName(tag.getName());
				if (tags == null || tags.size() == 0) {
					newTags.add(tag);
				} else {
					Tag newTag = em
							.getReference(Tag.class, tags.get(0).getId());
					newTags.add(newTag);
				}
			}
			note.setTags(newTags);
			
			for (NoteItem noteItem: note.getItems())
			{
				em.persist(noteItem);
			}
			em.persist(note);

			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}
	
	public List<Tag> getTagByName(String name) {
		EntityManager em = entityManagerFactory.createEntityManager();
		List<Tag> tags;
		try {
			Query q = em
					.createQuery("SELECT t FROM Tag t WHERE t.name=:name  ")
					.setParameter("name", name);
			tags = q.getResultList();
		} finally {
			em.close();
		}
		return tags;
	}

}
