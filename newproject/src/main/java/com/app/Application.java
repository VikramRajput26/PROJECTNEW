package com.app;

import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.app.config.AppConstants;
import com.app.entity.Role;
import com.app.repository.RoleRepository;

@SpringBootApplication
public class Application implements CommandLineRunner {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean // equivalent to <bean id ..../> in xml file
    public ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)
                .setPropertyCondition(Conditions.isNotNull());
        return modelMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(this.encoder.encode("xyz"));
        try {
            if (roleRepository.count() == 0) { // Check if the roles already exist
                Role role = new Role();
                role.setId(AppConstants.ADMIN);
                role.setName("ROLE_ADMIN");

                Role role1 = new Role();
                role1.setId(AppConstants.USER);
                role1.setName("ROLE_USER");

                List<Role> roles = List.of(role, role1);
                List<Role> result = this.roleRepository.saveAll(roles);

                result.forEach(r -> {
                    System.out.println(r.getName());
                });
            } else {
                System.out.println("Roles already exist in the database.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
