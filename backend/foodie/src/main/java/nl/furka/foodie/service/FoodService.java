package nl.furka.foodie.service;

import java.util.ArrayList;
import java.util.List;

import nl.furka.foodie.controller.handler.IngredientAlreadyExistsException;
import nl.furka.foodie.controller.handler.PropertyAlreadyExistsException;
import nl.furka.foodie.model.Ingredient;
import nl.furka.foodie.repository.IngredientRepository;
import org.springframework.stereotype.Service;

@Service
public class FoodService {
  private final IngredientRepository repo;

  FoodService(IngredientRepository repo) {
    this.repo = repo;
  }


  public Ingredient addIngredient(Ingredient ingredient) throws IngredientAlreadyExistsException {
    this.repo.storeIngredient(ingredient);
    return ingredient;
  }

  public Ingredient.Properties addProperty(Ingredient.Properties property) throws PropertyAlreadyExistsException {
    this.repo.storeProperty(property);

    return property;
  }

  public List<Ingredient.Properties> getProperties() {
    return this.repo.getProperties();
  }

  public List<Ingredient> getFoods() {

    var ingredientList = new ArrayList<Ingredient>();

    var ingredient = new Ingredient(
      1,
      "Furkan",
      4
    );

    ingredientList.add(ingredient);

    return ingredientList;
  }

}
