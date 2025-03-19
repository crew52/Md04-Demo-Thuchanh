package codegym.c10.assignmentdemo.model.service;

import codegym.c10.assignmentdemo.model.entity.Computer;
import codegym.c10.assignmentdemo.model.entity.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IComputerService extends IGenerateService<Computer> {
    Iterable<Computer> findAllByType(Type type);
    Page<Computer> findAll(Pageable pageable);
    Page<Computer> findAllByNameContaining(Pageable pageable, String name);
}

