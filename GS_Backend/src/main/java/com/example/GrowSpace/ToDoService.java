package com.example.GrowSpace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    ToDoRepository toDoRepository;

    public ToDo createToDo(ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    public List<ToDo> getAllToDos() {
        return toDoRepository.findAllByOrderByCreatedAtDesc();
    }

    public ToDo updateToDoStatus(Long id, Boolean status) {
        ToDo toDo = toDoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ToDo not found"));
        toDo.setStatus(status);
        return toDoRepository.save(toDo);
    }
}