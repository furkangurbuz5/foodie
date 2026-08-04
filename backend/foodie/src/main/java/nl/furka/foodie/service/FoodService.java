package nl.furka.foodie.service;

import static java.util.Collections.emptyList;
import java.util.List;
import java.util.UUID;

import nl.furka.foodie.controller.handler.IngredientAlreadyExistsException;
import nl.furka.foodie.controller.handler.PropertyAlreadyExistsException;
import nl.furka.foodie.dto.CreateIngredientPropertyRequest;
import nl.furka.foodie.dto.CreateIngredientRequest;
import nl.furka.foodie.model.Ingredient;
import nl.furka.foodie.model.Page;
import nl.furka.foodie.repository.IngredientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FoodService {
  private final IngredientRepository repo;

  FoodService(IngredientRepository repo) {
    this.repo = repo;
  }

  public Ingredient addIngredient(CreateIngredientRequest ingredient) throws IngredientAlreadyExistsException {
    return this.repo.storeIngredient(ingredient);
  }

  public Ingredient.Properties addProperty(CreateIngredientPropertyRequest property) throws PropertyAlreadyExistsException {
    return this.repo.storeProperty(property);
  }

  public List<Ingredient.Properties> getProperties() {
    emptyList();
    return this.repo.getProperties();
  }

  public List<Ingredient> getIngredients() {
    return this.repo.getIngredients();
  }

  public Ingredient getIngredientById(UUID id) {
    return this.repo.getIngredientById(id);
  }

  //TODO move to shared package probably.
  private <T> Page<T> mapToCustomPage(Page<T> page) {
    return new Page<>(
      page.item(),
      page.size(),
      page.number(),
      page.totalElements(),
      page.totalPages()
    );
  }

}
