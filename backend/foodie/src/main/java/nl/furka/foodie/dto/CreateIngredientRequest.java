package nl.furka.foodie.dto;

public record CreateIngredientRequest(
  String name,
  int propertiesId
) {}
