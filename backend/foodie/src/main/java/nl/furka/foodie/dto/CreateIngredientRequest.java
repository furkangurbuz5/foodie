package nl.furka.foodie.dto;

import nl.furka.foodie.model.Ingredient;

public record CreateIngredientRequest(
  String name,
  int propertiesId
) {

  public Ingredient toModel(){
    return null;
  }
}
