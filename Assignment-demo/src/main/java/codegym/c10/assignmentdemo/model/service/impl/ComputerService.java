package codegym.c10.assignmentdemo.model.service.impl;

import codegym.c10.assignmentdemo.model.entity.Computer;
import codegym.c10.assignmentdemo.model.entity.Type;
import codegym.c10.assignmentdemo.model.repository.IComputerRepository;
import codegym.c10.assignmentdemo.model.service.IComputerService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;
import java.util.Set;

@Service
@Validated
public class ComputerService implements IComputerService {
    @Autowired
    private IComputerRepository computerRepository;

    private final Validator validator;

    public ComputerService(Validator validator) {
        this.validator = validator;
    }

    @Override
    public Iterable<Computer> findAll() {
        return computerRepository.findAll();
    }

    @Override
    public Computer save(Computer computer) {
        validateComputer(computer);
        computerRepository.save(computer);
        return computer;
    }

    @Override
    public Optional<Computer> findById(Long id) {
        return computerRepository.findById(id);
    }

    @Override
    public void remove(Long id) {
        computerRepository.deleteById(id);
    }

    @Override
    public Iterable<Computer> findAllByType(Type type) {
        return computerRepository.findAllByType(type);
    }

    @Override
    public Page<Computer> findAll(Pageable pageable) {
        return computerRepository.findAll(pageable);
    }

    @Override
    public Page<Computer> findAllByNameContaining(Pageable pageable, String name) {
        return computerRepository.findAllByNameContaining(pageable, name);
    }

    private void validateComputer(Computer computer) {
        Set<ConstraintViolation<Computer>> violations = validator.validate(computer);
        if (!violations.isEmpty()) {
            String errorMessage = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .reduce((msg1, msg2) -> msg1 + "; " + msg2)
                    .orElse("Dữ liệu không hợp lệ.");
            throw new ConstraintViolationException(errorMessage, violations);
        }
    }
}
