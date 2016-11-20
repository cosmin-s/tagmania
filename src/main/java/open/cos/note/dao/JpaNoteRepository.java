package open.cos.note.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;

import org.springframework.stereotype.Repository;

import open.cos.note.model.Note;

@Repository
public class JpaNoteRepository {
	
	@PersistenceUnit
	EntityManagerFactory entityManagerFactory;
	
	@SuppressWarnings("unchecked")
	public List<Note> getNotesByTag(String tag){
		return (List<Note>)(entityManagerFactory.createEntityManager().
			createQuery("select n from Note n").getResultList());
	}
	
	public void createNote(Note note){
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction transaction = em.getTransaction();
		transaction.begin();
		em.persist(note);
		transaction.commit();
	}

}
