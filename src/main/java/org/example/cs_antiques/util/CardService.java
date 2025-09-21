package org.example.cs_antiques.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CardService {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Encrypt card number
    public String encryptCard(String cardNumber) {
        return encoder.encode(cardNumber);
    }

    // Verify card number matches the encrypted one
    public boolean matchCard(String rawCard, String encryptedCard) {
        return encoder.matches(rawCard, encryptedCard);
    }
}
