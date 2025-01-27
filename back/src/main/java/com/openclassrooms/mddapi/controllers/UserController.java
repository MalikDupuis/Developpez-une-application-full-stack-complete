package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.requests.ArticleRequest;
import com.openclassrooms.mddapi.requests.ProfilRequest;
import com.openclassrooms.mddapi.response.JwtResponse;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.services.JWTService;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @PutMapping()
    public ResponseEntity<?> updateUser(@RequestBody ProfilRequest profilRequest) {
        Optional<User> optionalUser = userService.findByID(profilRequest.getUserId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
        }
        optionalUser.ifPresent(user -> user.setNom(profilRequest.getNom()));
        optionalUser.ifPresent(user -> user.setEmail(profilRequest.getEmail()));
        optionalUser.ifPresent(user -> userService.save(user));
        String token = jwtService.generateToken(profilRequest.getEmail());
        JwtResponse tokenResponse = new JwtResponse(token);
        return ResponseEntity.ok(tokenResponse);

    }
}
