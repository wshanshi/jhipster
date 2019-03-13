package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Test1;
import com.mycompany.myapp.repository.Test1Repository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Test1.
 */
@RestController
@RequestMapping("/api")
public class Test1Resource {

    private final Logger log = LoggerFactory.getLogger(Test1Resource.class);

    private static final String ENTITY_NAME = "test1";

    private final Test1Repository test1Repository;

    public Test1Resource(Test1Repository test1Repository) {
        this.test1Repository = test1Repository;
    }

    /**
     * POST  /test-1-s : Create a new test1.
     *
     * @param test1 the test1 to create
     * @return the ResponseEntity with status 201 (Created) and with body the new test1, or with status 400 (Bad Request) if the test1 has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-1-s")
    @Timed
    public ResponseEntity<Test1> createTest1(@RequestBody Test1 test1) throws URISyntaxException {
        log.debug("REST request to save Test1 : {}", test1);
        if (test1.getId() != null) {
            throw new BadRequestAlertException("A new test1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Test1 result = test1Repository.save(test1);
        return ResponseEntity.created(new URI("/api/test-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-1-s : Updates an existing test1.
     *
     * @param test1 the test1 to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated test1,
     * or with status 400 (Bad Request) if the test1 is not valid,
     * or with status 500 (Internal Server Error) if the test1 couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-1-s")
    @Timed
    public ResponseEntity<Test1> updateTest1(@RequestBody Test1 test1) throws URISyntaxException {
        log.debug("REST request to update Test1 : {}", test1);
        if (test1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Test1 result = test1Repository.save(test1);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, test1.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-1-s : get all the test1S.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of test1S in body
     */
    @GetMapping("/test-1-s")
    @Timed
    public List<Test1> getAllTest1S() {
        log.debug("REST request to get all Test1S");
        return test1Repository.findAll();
    }

    /**
     * GET  /test-1-s/:id : get the "id" test1.
     *
     * @param id the id of the test1 to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the test1, or with status 404 (Not Found)
     */
    @GetMapping("/test-1-s/{id}")
    @Timed
    public ResponseEntity<Test1> getTest1(@PathVariable Long id) {
        log.debug("REST request to get Test1 : {}", id);
        Optional<Test1> test1 = test1Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(test1);
    }

    /**
     * DELETE  /test-1-s/:id : delete the "id" test1.
     *
     * @param id the id of the test1 to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-1-s/{id}")
    @Timed
    public ResponseEntity<Void> deleteTest1(@PathVariable Long id) {
        log.debug("REST request to delete Test1 : {}", id);

        test1Repository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
