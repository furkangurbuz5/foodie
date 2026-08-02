package nl.furka.foodie.model;

import java.util.UUID;

public record Ingredient(
  UUID id,
  String name,
  int propertiesId
) {
  public record Properties(
    int id,
    String name,
    String unit,
    String category
  ) {
  }
}



