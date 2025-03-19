package codegym.c10.assignmentdemo.controller;

import codegym.c10.assignmentdemo.model.entity.Computer;
import codegym.c10.assignmentdemo.model.service.IComputerService;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/computers")
@CrossOrigin("*")
public class ComputerController {
    @Autowired
    private IComputerService computerService;

    @GetMapping
    public ResponseEntity<Page<Computer>> findAllComputer(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Computer> computers = computerService.findAll(pageable);

        return computers.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(computers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Computer> findComputerById(@PathVariable Long id) {
        Optional<Computer> computerOptional = computerService.findById(id);
        if (!computerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(computerOptional.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Computer> saveComputer(@RequestBody Computer computer) {
        Computer savedComputer = computerService.save(computer);
        return savedComputer != null
                ? ResponseEntity.status(HttpStatus.CREATED).body(savedComputer)
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Computer> updateComputer(@PathVariable Long id, @RequestBody Computer computer) {
        Optional<Computer> computerOptional = computerService.findById(id);
        if (!computerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        computer.setId(computerOptional.get().getId());
        return new ResponseEntity<>(computerService.save(computer), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Computer> deleteCustomer(@PathVariable Long id) {
        Optional<Computer> computerOptional = computerService.findById(id);
        if (!computerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        computerService.remove(id);
        return new ResponseEntity<>(computerOptional.get(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Computer>> searchComputers(
            @RequestParam("search") Optional<String> search,
            Pageable pageable) {

        Page<Computer> computers = search
                .map(s -> computerService.findAllByNameContaining(pageable, s))
                .orElseGet(() -> computerService.findAll(pageable));

        return computers.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(computers);
    }
}
