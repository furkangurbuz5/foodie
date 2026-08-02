package nl.furka.foodie.dto;

public record CreateIngredientPropertyRequest(
  String name,
  String unit,
  String category
) {
}
