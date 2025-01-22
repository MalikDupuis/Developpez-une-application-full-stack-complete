package com.openclassrooms.mddapi.controllers;


import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.requests.LoginRequest;
import com.openclassrooms.mddapi.requests.RegisterRequest;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.response.JwtResponse;
import com.openclassrooms.mddapi.response.UserInformationResponse;
import com.openclassrooms.mddapi.services.JWTService;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody LoginRequest loginRequest) {
        System.out.println("token");
        User user = userService.findByEmail(loginRequest.getEmail());

        if(user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email incorrect!!"));
        }
        if (!userService.isValidPassword(loginRequest.getPassword())) {
            return ResponseEntity.badRequest().body("Mot de passe invalide.");
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email ou mot de passe incorrect!"));
        }

        String token = jwtService.generateToken(loginRequest.getEmail());

        JwtResponse tokenResponse = new JwtResponse(token);
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        user.setPassword(encodedPassword);
        user.setNom(registerRequest.getNom());
        userService.save(user);
        String token = jwtService.generateToken(user.getEmail());

        JwtResponse tokenResponse = new JwtResponse(token);
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            if (jwtService.validateToken(token)) {
                String email = jwtService.extractEmailFromToken(token);
                User user = userService.findByEmail(email);
                if (user != null) {
                    UserInformationResponse userInformationResponse = new UserInformationResponse(user.getId(), user.getNom(), user.getEmail());
                    return ResponseEntity.ok(userInformationResponse);
                }
            }
        }
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Error: Token incorrect!!"));
    }
}
