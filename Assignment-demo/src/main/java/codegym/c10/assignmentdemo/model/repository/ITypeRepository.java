package codegym.c10.assignmentdemo.model.repository;

import codegym.c10.assignmentdemo.model.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ITypeRepository extends JpaRepository<Type, Long> {
    @Query(nativeQuery = true, value = "CALL delete_type(:id)")
    @Transactional
    @Modifying
    void deleteTypeById(@Param("id") Long id);
}
