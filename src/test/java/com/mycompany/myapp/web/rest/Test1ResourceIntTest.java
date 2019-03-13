package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestJhipster3App;

import com.mycompany.myapp.domain.Test1;
import com.mycompany.myapp.repository.Test1Repository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Test1Resource REST controller.
 *
 * @see Test1Resource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestJhipster3App.class)
public class Test1ResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SEX = "AAAAAAAAAA";
    private static final String UPDATED_SEX = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    @Autowired
    private Test1Repository test1Repository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTest1MockMvc;

    private Test1 test1;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Test1Resource test1Resource = new Test1Resource(test1Repository);
        this.restTest1MockMvc = MockMvcBuilders.standaloneSetup(test1Resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Test1 createEntity(EntityManager em) {
        Test1 test1 = new Test1()
            .name(DEFAULT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE);
        return test1;
    }

    @Before
    public void initTest() {
        test1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTest1() throws Exception {
        int databaseSizeBeforeCreate = test1Repository.findAll().size();

        // Create the Test1
        restTest1MockMvc.perform(post("/api/test-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(test1)))
            .andExpect(status().isCreated());

        // Validate the Test1 in the database
        List<Test1> test1List = test1Repository.findAll();
        assertThat(test1List).hasSize(databaseSizeBeforeCreate + 1);
        Test1 testTest1 = test1List.get(test1List.size() - 1);
        assertThat(testTest1.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTest1.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTest1.getAge()).isEqualTo(DEFAULT_AGE);
    }

    @Test
    @Transactional
    public void createTest1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = test1Repository.findAll().size();

        // Create the Test1 with an existing ID
        test1.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTest1MockMvc.perform(post("/api/test-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(test1)))
            .andExpect(status().isBadRequest());

        // Validate the Test1 in the database
        List<Test1> test1List = test1Repository.findAll();
        assertThat(test1List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTest1S() throws Exception {
        // Initialize the database
        test1Repository.saveAndFlush(test1);

        // Get all the test1List
        restTest1MockMvc.perform(get("/api/test-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(test1.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)));
    }
    
    @Test
    @Transactional
    public void getTest1() throws Exception {
        // Initialize the database
        test1Repository.saveAndFlush(test1);

        // Get the test1
        restTest1MockMvc.perform(get("/api/test-1-s/{id}", test1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(test1.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE));
    }

    @Test
    @Transactional
    public void getNonExistingTest1() throws Exception {
        // Get the test1
        restTest1MockMvc.perform(get("/api/test-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTest1() throws Exception {
        // Initialize the database
        test1Repository.saveAndFlush(test1);

        int databaseSizeBeforeUpdate = test1Repository.findAll().size();

        // Update the test1
        Test1 updatedTest1 = test1Repository.findById(test1.getId()).get();
        // Disconnect from session so that the updates on updatedTest1 are not directly saved in db
        em.detach(updatedTest1);
        updatedTest1
            .name(UPDATED_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE);

        restTest1MockMvc.perform(put("/api/test-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTest1)))
            .andExpect(status().isOk());

        // Validate the Test1 in the database
        List<Test1> test1List = test1Repository.findAll();
        assertThat(test1List).hasSize(databaseSizeBeforeUpdate);
        Test1 testTest1 = test1List.get(test1List.size() - 1);
        assertThat(testTest1.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTest1.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTest1.getAge()).isEqualTo(UPDATED_AGE);
    }

    @Test
    @Transactional
    public void updateNonExistingTest1() throws Exception {
        int databaseSizeBeforeUpdate = test1Repository.findAll().size();

        // Create the Test1

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTest1MockMvc.perform(put("/api/test-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(test1)))
            .andExpect(status().isBadRequest());

        // Validate the Test1 in the database
        List<Test1> test1List = test1Repository.findAll();
        assertThat(test1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTest1() throws Exception {
        // Initialize the database
        test1Repository.saveAndFlush(test1);

        int databaseSizeBeforeDelete = test1Repository.findAll().size();

        // Get the test1
        restTest1MockMvc.perform(delete("/api/test-1-s/{id}", test1.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Test1> test1List = test1Repository.findAll();
        assertThat(test1List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Test1.class);
        Test1 test11 = new Test1();
        test11.setId(1L);
        Test1 test12 = new Test1();
        test12.setId(test11.getId());
        assertThat(test11).isEqualTo(test12);
        test12.setId(2L);
        assertThat(test11).isNotEqualTo(test12);
        test11.setId(null);
        assertThat(test11).isNotEqualTo(test12);
    }
}
