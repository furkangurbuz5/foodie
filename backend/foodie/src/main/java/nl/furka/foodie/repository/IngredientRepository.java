package nl.furka.foodie.repository;

import nl.furka.foodie.controller.handler.IngredientAlreadyExistsException;
import nl.furka.foodie.controller.handler.PropertyAlreadyExistsException;
import nl.furka.foodie.dto.CreateIngredientRequest;
import nl.furka.foodie.model.Ingredient;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class IngredientRepository {
  private final JdbcClient jdbcClient;

  public IngredientRepository(JdbcClient client) {
    this.jdbcClient = client;
  }

  public Ingredient storeIngredient(CreateIngredientRequest req) throws IngredientAlreadyExistsException {
    String sql = """
      INSERT INTO ingredient (name, properties_id)
      VALUES (?, ?)
      RETURNING id, name, properties_id
      """;

    try {
      return jdbcClient.sql(sql)
        .param(req.name())
        .param(req.propertiesId())
        .query(ingredientRowMapper())
        .single();
    } catch (Exception e) {
      throw new IngredientAlreadyExistsException("You tried adding an ingredient that already exists.");
    }
  }

  public void storeProperty(Ingredient.Properties property) throws PropertyAlreadyExistsException {
    String sql = "INSERT INTO properties (id, name, unit, category) VALUES (?, ?, ?, ?);";

    try {
      jdbcClient.sql(sql)
        .param(property.id())
        .param(property.name())
        .param(property.unit())
        .param(property.category())
        .update();
    } catch (PropertyAlreadyExistsException dke) {
      throw new PropertyAlreadyExistsException("Property already exists");
    }

  }

  public List<Ingredient.Properties> getProperties() {
    String sql = "SELECT * FROM properties;";

    return jdbcClient.sql(sql)
      .query(propertiesRowMapper())
      .list();

  }

  private RowMapper<Ingredient> ingredientRowMapper() {
    return (r, _) -> new Ingredient(
      r.getObject("id", java.util.UUID.class),
      r.getString("name"),
      r.getInt("properties")
    );

  }

  private RowMapper<Ingredient.Properties> propertiesRowMapper() {
    return (r, _) -> new Ingredient.Properties(
      r.getInt("id"),
      r.getString("name"),
      r.getString("unit"),
      r.getString("category")
    );
  }
}
