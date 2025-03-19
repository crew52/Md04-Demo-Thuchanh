package codegym.c10.assignmentdemo.model.service.impl;

import codegym.c10.assignmentdemo.model.entity.Type;
import codegym.c10.assignmentdemo.model.repository.ITypeRepository;
import codegym.c10.assignmentdemo.model.service.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TypeService implements ITypeService {
    @Autowired
    private ITypeRepository typeRepository;

    @Override
    public Iterable<Type> findAll() {
        return typeRepository.findAll();
    }

    @Override
    public Type save(Type type) {
        return typeRepository.save(type);
    }

    @Override
    public Optional<Type> findById(Long id) {
        return typeRepository.findById(id);
    }

    @Override
    public void remove(Long id) {
        typeRepository.deleteTypeById(id);
    }
}
