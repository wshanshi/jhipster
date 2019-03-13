package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Test2;
import com.mycompany.myapp.repository.Test2Repository;
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
 * REST controller for managing Test2.
 */
@RestController
@RequestMapping("/api")
public class Test2Resource {

    private final Logger log = LoggerFactory.getLogger(Test2Resource.class);

    private static final String ENTITY_NAME = "test2";

    private final Test2Repository test2Repository;

    public Test2Resource(Test2Repository test2Repository) {
        this.test2Repository = test2Repository;
    }

    /**
     * POST  /test-2-s : Create a new test2.
     *
     * @param test2 the test2 to create
     * @return the ResponseEntity with status 201 (Created) and with body the new test2, or with status 400 (Bad Request) if the test2 has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-2-s")
    @Timed
    public ResponseEntity<Test2> createTest2(@RequestBody Test2 test2) throws URISyntaxException {
        log.debug("REST request to save Test2 : {}", test2);
        if (test2.getId() != null) {
            throw new BadRequestAlertException("A new test2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Test2 result = test2Repository.save(test2);
        return ResponseEntity.created(new URI("/api/test-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-2-s : Updates an existing test2.
     *
     * @param test2 the test2 to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated test2,
     * or with status 400 (Bad Request) if the test2 is not valid,
     * or with status 500 (Internal Server Error) if the test2 couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-2-s")
    @Timed
    public ResponseEntity<Test2> updateTest2(@RequestBody Test2 test2) throws URISyntaxException {
        log.debug("REST request to update Test2 : {}", test2);
        if (test2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Test2 result = test2Repository.save(test2);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, test2.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-2-s : get all the test2S.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of test2S in body
     */
    @GetMapping("/test-2-s")
    @Timed
    public List<Test2> getAllTest2S() {
        log.debug("REST request to get all Test2S");
        return test2Repository.findAll();
    }

    /**
     * GET  /test-2-s/:id : get the "id" test2.
     *
     * @param id the id of the test2 to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the test2, or with status 404 (Not Found)
     */
    @GetMapping("/test-2-s/{id}")
    @Timed
    public ResponseEntity<Test2> getTest2(@PathVariable Long id) {
        log.debug("REST request to get Test2 : {}", id);
        Optional<Test2> test2 = test2Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(test2);
    }

    /**
     * DELETE  /test-2-s/:id : delete the "id" test2.
     *
     * @param id the id of the test2 to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-2-s/{id}")
    @Timed
    public ResponseEntity<Void> deleteTest2(@PathVariable Long id) {
        log.debug("REST request to delete Test2 : {}", id);

        test2Repository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
