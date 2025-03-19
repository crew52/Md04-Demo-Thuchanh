package codegym.c10.assignmentdemo.model.repository;

import codegym.c10.assignmentdemo.model.entity.Computer;
import codegym.c10.assignmentdemo.model.entity.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IComputerRepository  extends JpaRepository<Computer, Long> {
    Iterable<Computer> findAllByType(Type type);
    Page<Computer> findAll(Pageable pageable);
    Page<Computer> findAllByNameContaining(Pageable pageable, String name);
}
