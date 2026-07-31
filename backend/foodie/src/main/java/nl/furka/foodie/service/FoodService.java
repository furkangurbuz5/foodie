package nl.furka.foodie.service;

import java.util.ArrayList;
import java.util.List;

import nl.furka.foodie.model.Ingredient;
import nl.furka.foodie.repository.IngredientRepository;
import org.springframework.stereotype.Service;

@Service
public class FoodService {
  private final IngredientRepository repo;

  FoodService(IngredientRepository repo) {
    this.repo = repo;
  }


  public Ingredient addIngredient(Ingredient ingredient) throws RuntimeException{
    this.repo.storeIngredient(ingredient);
    return ingredient;
  }

  public Ingredient.Properties addProperty(Ingredient.Properties property){
    this.repo.storeProperty(property);

    return property;
  }


  public List<String> getFoods() {

    var ingredientList = new ArrayList<String>();

    var ingredient = "Furkan!";

    ingredientList.add(ingredient);

    return ingredientList;
  }

}
