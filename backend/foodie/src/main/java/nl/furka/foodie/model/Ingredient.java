package nl.furka.foodie.model;

import java.util.List;
import java.util.UUID;

public record Ingredient(
  UUID id,
  String name,
  int servingSize,
  List<Property> properties) {
}


