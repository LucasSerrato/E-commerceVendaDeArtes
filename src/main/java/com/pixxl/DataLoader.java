package com.pixxl;

import com.pixxl.model.Cliente;
import com.pixxl.repository.ClienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ClienteRepository clienteRepository;

    public DataLoader(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Só adiciona se o banco estiver vazio
        if (clienteRepository.count() == 0) {
            Cliente c1 = new Cliente(null, "Lucas", "lucas@gmail.com", "lucas123", false, null);
            Cliente c2 = new Cliente(null, "Ju", "ju@gmail.com", "ju123", true, null);
            Cliente c3 = new Cliente(null, "Pearls", "pearls@gmail.com", "pearls123", true, null);
            Cliente c4 = new Cliente(null, "João", "joão@gmail.com", "joao123", true, null);

            clienteRepository.save(c1);
            clienteRepository.save(c2);
            clienteRepository.save(c3);
            clienteRepository.save(c4);

            System.out.println("Usuários iniciais criados no banco.");
        } else {
            System.out.println("Banco já contém usuários, não foram criados novos.");
        }
    }
}
