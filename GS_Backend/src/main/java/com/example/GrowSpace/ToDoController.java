package com.example.GrowSpace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/todos")
@CrossOrigin
public class ToDoController {
    @Autowired
    ToDoService toDoService;

    @PostMapping("/create")
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo toDo) {
        return new ResponseEntity<>(toDoService.createToDo(toDo), HttpStatus.CREATED);
    }

    @GetMapping("/get")
    public ResponseEntity<List<ToDo>> getAllToDos() {
        return ResponseEntity.ok(toDoService.getAllToDos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateToDoStatus(@PathVariable Long id, @RequestParam Boolean status) {
        return ResponseEntity.ok(toDoService.updateToDoStatus(id, status));
    }

}
