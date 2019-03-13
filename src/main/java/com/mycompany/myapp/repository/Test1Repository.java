package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Test1;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Test1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Test1Repository extends JpaRepository<Test1, Long> {

}
