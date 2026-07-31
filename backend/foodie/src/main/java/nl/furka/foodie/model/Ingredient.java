package nl.furka.foodie.model;

public record Ingredient(
  int id,
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



