package com.example.GrowSpace;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

    @PutMapping("/change/{id}")
    public ResponseEntity<ToDo> updateToDoStatus(@PathVariable Long id, @RequestParam Boolean status) {
        return ResponseEntity.ok(toDoService.updateToDoStatus(id, status));
    }

    @GetMapping("/say")
    public JSONPObject sayAllToDos() {
        JSONPObject jsonPObject = new JSONPObject("say", toDoService.getAllToDos());
        return jsonPObject;
    }
}