package nl.furka.foodie.repository;

import nl.furka.foodie.model.Ingredient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class IngredientRepository {
  private final JdbcTemplate jdbc;

  public IngredientRepository(JdbcTemplate jdbcTemplate) {
    this.jdbc = jdbcTemplate;
  }

  public void storeIngredient(Ingredient ingredient) throws RuntimeException{
    String sql = "INSERT INTO ingredient (id, name, properties_id)\n" +
      "VALUES (?, ?, ?);";

    try {
      jdbc.update(sql,
        ingredient.id(),
        ingredient.name(),
        ingredient.propertiesId()
      );
    } catch (Exception e) {
      throw new RuntimeException("Ingredient already exists");
    }
  }

  public void storeProperty(Ingredient.Properties property) {
    String sql = "INSERT INTO properties (id, name, unit, category) \n" +
      "VALUES (?, ?, ?, ?)";

    jdbc.update(sql,
      property.id(),
      property.name(),
      property.unit(),
      property.category()
    );
  }
}
