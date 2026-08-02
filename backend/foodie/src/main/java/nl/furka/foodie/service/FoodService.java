package nl.furka.foodie.service;

import java.util.ArrayList;
import java.util.List;

import nl.furka.foodie.controller.handler.IngredientAlreadyExistsException;
import nl.furka.foodie.controller.handler.PropertyAlreadyExistsException;
import nl.furka.foodie.dto.CreateIngredientRequest;
import nl.furka.foodie.model.Ingredient;
import nl.furka.foodie.repository.IngredientRepository;
import nl.furka.foodie.repository.IngredientRepositoryJpa;
import org.springframework.stereotype.Service;

@Service
public class FoodService {
  private final IngredientRepository repo;
  private final IngredientRepositoryJpa repoJpa;

  FoodService(IngredientRepository repo, IngredientRepositoryJpa repoJpa) {
    this.repo = repo;
    this.repoJpa = repoJpa;
  }

  public Ingredient addIngredient(CreateIngredientRequest ingredient) throws IngredientAlreadyExistsException {
    return this.repo.storeIngredient(ingredient);
  }

  public Ingredient.Properties addProperty(Ingredient.Properties property) throws PropertyAlreadyExistsException {
    this.repo.storeProperty(property);
    return property;
  }

  public List<Ingredient.Properties> getProperties() {
    return this.repo.getProperties();
  }

}
