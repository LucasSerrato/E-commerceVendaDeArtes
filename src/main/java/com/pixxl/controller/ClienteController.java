// src/main/java/com/pixxl/controller/ClienteController.java
package com.pixxl.controller;

import com.pixxl.model.Cliente;
import com.pixxl.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
        return service.salvar(cliente);
    }
}
