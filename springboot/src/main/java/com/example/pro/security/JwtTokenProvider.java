package com.example.pro.security;

import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.example.pro.security.UserPrincipal;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private int jwtExpirationMs;

    @PostConstruct
    public void init() {
        System.out.println("JWT Secret: " + jwtSecret);
        System.out.println("JWT Expiration (ms): " + jwtExpirationMs);
    }

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        System.out.println("Generating token for user: " + userPrincipal.getUsername());
        try {
            // Explicitly convert secret to byte array
            byte[] secretBytes = jwtSecret.getBytes();
            String token = Jwts.builder()
                    .setSubject(userPrincipal.getUsername())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                    .signWith(SignatureAlgorithm.HS512, secretBytes)
                    .compact();
            System.out.println("Generated JWT Token: " + token);  // Check if token is generated
            return token;
        } catch (Exception e) {
            System.out.println("Error generating JWT token");
            e.printStackTrace();  // Print stack trace for detailed error info
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            byte[] secretBytes = jwtSecret.getBytes();
            Jwts.parser().setSigningKey(secretBytes).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }

    public String getUserNameFromJwtToken(String token) {
        byte[] secretBytes = jwtSecret.getBytes();
        return Jwts.parser().setSigningKey(secretBytes).parseClaimsJws(token).getBody().getSubject();
    }
}
