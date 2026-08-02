package nl.furka.foodie.repository;

import nl.furka.foodie.model.Ingredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepositoryJpa extends CrudRepository<Ingredient, Ingredient> {
}
