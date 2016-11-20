package open.cos.note;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import com.jayway.restassured.response.Response;

import open.cos.note.model.Note;

/**
 * Integration (REST) test 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = App.class)
//@WebAppConfiguration
@ActiveProfiles("test")
@WebIntegrationTest("server:port:0")

public class AppTest 
{
	@PersistenceUnit
	EntityManagerFactory entityManagerFactory;
	
	@Value("${local.server.port}")
	private int serverPort;
	
	@Before
	public void beforeTest(){
		RestAssured.port = serverPort;
		
		//cleanup database
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction transaction = em.getTransaction();
		transaction.begin();
		Query query = em.createQuery("delete from Note");
		query.executeUpdate();
		transaction.commit();
	}
	
	@Test
    public void testCreateNote(){
	   String json = "{\"title\":\"to-do for work 1\","+
		"\"content\": \"check mail from X to update the message translation\","+
		"\"date\": \"2016-11-19\"}";
	   RestAssured.given().body(json).contentType(ContentType.JSON).post("/note");
	   
       Response response = RestAssured.get("/note?tag=whatever").
    	 then().contentType(ContentType.JSON).extract().response();
       Note[] notes = response.getBody().as(Note[].class);
       Assert.assertEquals(1, notes.length);
       Assert.assertNotNull(notes[0].getTitle());
       Assert.assertNotNull(notes[0].getContent());
       //MatcherAssert.assertThat(notes, Matchers.hasSize(1));
    }
   
}
