package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestJhipster3App;

import com.mycompany.myapp.domain.Test2;
import com.mycompany.myapp.repository.Test2Repository;
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
 * Test class for the Test2Resource REST controller.
 *
 * @see Test2Resource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestJhipster3App.class)
public class Test2ResourceIntTest {

    private static final String DEFAULT_NAMES = "AAAAAAAAAA";
    private static final String UPDATED_NAMES = "BBBBBBBBBB";

    private static final String DEFAULT_SEXS = "AAAAAAAAAA";
    private static final String UPDATED_SEXS = "BBBBBBBBBB";

    @Autowired
    private Test2Repository test2Repository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTest2MockMvc;

    private Test2 test2;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Test2Resource test2Resource = new Test2Resource(test2Repository);
        this.restTest2MockMvc = MockMvcBuilders.standaloneSetup(test2Resource)
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
    public static Test2 createEntity(EntityManager em) {
        Test2 test2 = new Test2()
            .names(DEFAULT_NAMES)
            .sexs(DEFAULT_SEXS);
        return test2;
    }

    @Before
    public void initTest() {
        test2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTest2() throws Exception {
        int databaseSizeBeforeCreate = test2Repository.findAll().size();

        // Create the Test2
        restTest2MockMvc.perform(post("/api/test-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(test2)))
            .andExpect(status().isCreated());

        // Validate the Test2 in the database
        List<Test2> test2List = test2Repository.findAll();
        assertThat(test2List).hasSize(databaseSizeBeforeCreate + 1);
        Test2 testTest2 = test2List.get(test2List.size() - 1);
        assertThat(testTest2.getNames()).isEqualTo(DEFAULT_NAMES);
        assertThat(testTest2.getSexs()).isEqualTo(DEFAULT_SEXS);
    }

    @Test
    @Transactional
    public void createTest2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = test2Repository.findAll().size();

        // Create the Test2 with an existing ID
        test2.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTest2MockMvc.perform(post("/api/test-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(test2)))
            .andExpect(status().isBadRequest());

        // Validate the Test2 in the database
        List<Test2> test2List = test2Repository.findAll();
        assertThat(test2List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTest2S() throws Exception {
        // Initialize the database
        test2Repository.saveAndFlush(test2);

        // Get all the test2List
        restTest2MockMvc.perform(get("/api/test-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(test2.getId().intValue())))
            .andExpect(jsonPath("$.[*].names").value(hasItem(DEFAULT_NAMES.toString())))
            .andExpect(jsonPath("$.[*].sexs").value(hasItem(DEFAULT_SEXS.toString())));
    }
    
    @Test
    @Transactional
    public void getTest2() throws Exception {
        // Initialize the database
        test2Repository.saveAndFlush(test2);

        // Get the test2
        restTest2MockMvc.perform(get("/api/test-2-s/{id}", test2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(test2.getId().intValue()))
            .andExpect(jsonPath("$.names").value(DEFAULT_NAMES.toString()))
            .andExpect(jsonPath("$.sexs").value(DEFAULT_SEXS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTest2() throws Exception {
        // Get the test2
        restTest2MockMvc.perform(get("/api/test-2-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTest2() throws Exception {
        // Initialize the database
        test2Repository.saveAndFlush(test2);

        int databaseSizeBeforeUpdate = test2Repository.findAll().size();

        // Update the test2
        Test2 updatedTest2 = test2Repository.findById(test2.getId()).get();
        // Disconnect from session so that the updates on updatedTest2 are not directly saved in db
        em.detach(updatedTest2);
        updatedTest2
            .names(UPDATED_NAMES)
            .sexs(UPDATED_SEXS);

        restTest2MockMvc.perform(put("/api/test-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTest2)))
            .andExpect(status().isOk());

        // Validate the Test2 in the database
        List<Test2> test2List = test2Repository.findAll();
        assertThat(test2List).hasSize(databaseSizeBeforeUpdate);
        Test2 testTest2 = test2List.get(test2List.size() - 1);
        assertThat(testTest2.getNames()).isEqualTo(UPDATED_NAMES);
        assertThat(testTest2.getSexs()).isEqualTo(UPDATED_SEXS);
    }

    @Test
    @Transactional
    public void updateNonExistingTest2() throws Exception {
        int databaseSizeBeforeUpdate = test2Repository.findAll().size();

        // Create the Test2

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTest2MockMvc.perform(put("/api/test-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(test2)))
            .andExpect(status().isBadRequest());

        // Validate the Test2 in the database
        List<Test2> test2List = test2Repository.findAll();
        assertThat(test2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTest2() throws Exception {
        // Initialize the database
        test2Repository.saveAndFlush(test2);

        int databaseSizeBeforeDelete = test2Repository.findAll().size();

        // Get the test2
        restTest2MockMvc.perform(delete("/api/test-2-s/{id}", test2.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Test2> test2List = test2Repository.findAll();
        assertThat(test2List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Test2.class);
        Test2 test21 = new Test2();
        test21.setId(1L);
        Test2 test22 = new Test2();
        test22.setId(test21.getId());
        assertThat(test21).isEqualTo(test22);
        test22.setId(2L);
        assertThat(test21).isNotEqualTo(test22);
        test21.setId(null);
        assertThat(test21).isNotEqualTo(test22);
    }
}
