package nl.furka.foodie.model;

import java.util.UUID;

public record IngredientProperties(
        int id,
        UUID ingredientId,
        int propertyId,
        String name,
        String value) {
}
