package nl.furka.foodie.repository;

import nl.furka.foodie.controller.handler.IngredientAlreadyExistsException;
import nl.furka.foodie.controller.handler.PropertyAlreadyExistsException;
import nl.furka.foodie.dto.CreateIngredientPropertyRequest;
import nl.furka.foodie.dto.CreateIngredientRequest;
import nl.furka.foodie.model.Ingredient;
import nl.furka.foodie.model.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
public class IngredientRepository {
  private final JdbcClient jdbcClient;
  private final Logger logger = LoggerFactory.getLogger(IngredientRepository.class);

  public IngredientRepository(JdbcClient client) {
    this.jdbcClient = client;
  }

  public Ingredient storeIngredient(CreateIngredientRequest req) throws IngredientAlreadyExistsException {
    String sql = """
      INSERT INTO ingredient (name, properties_id)
      VALUES (?, ?)
      RETURNING id, name, properties_id;
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

  public List<Ingredient> getIngredients() {
    String sql = """
      SELECT *
      FROM ingredient;
      """;
    try {
      return jdbcClient.sql(sql)
        .query(ingredientRowMapper())
        .list();
    } catch (Exception e) {
      throw new IngredientAlreadyExistsException("You tried adding an ingredient that already exists.");
    }
  }

  public Ingredient getIngredientById(UUID id) {
    String sql = """
      SELECT *
      FROM ingredient
      WHERE id = :id;
      """;
    try {
      return jdbcClient.sql(sql)
        .param("id", id)
        .query(ingredientRowMapper())
        .single();
    } catch (Exception e) {
      e.printStackTrace();
      throw new IngredientAlreadyExistsException("Placeholder.");
    }
  }

  public Property storeProperty(CreateIngredientPropertyRequest property) throws PropertyAlreadyExistsException {
    String sql = """
      INSERT INTO properties (name, unit, category)
      VALUES (?, ?, ?)
      RETURNING id, name, unit, category;
      """;

    try {
      return jdbcClient.sql(sql)
        .param(property.name())
        .param(property.unit())
        .param(property.category())
        .query(propertiesRowMapper())
        .single();
    } catch (PropertyAlreadyExistsException dke) {
      throw new PropertyAlreadyExistsException("Property already exists");
    }

  }

  public List<Property> getProperties() {
    String sql = "SELECT * FROM properties;";

    return jdbcClient.sql(sql)
      .query(propertiesRowMapper())
      .list();

  }

  private RowMapper<Ingredient> ingredientRowMapper() {
    return (r, _) -> new Ingredient(
      r.getObject("id", UUID.class),
      r.getString("name"),
      r.getInt("serving_size"),
      r.getObject("properties", List.class)
    );

  }

  private RowMapper<Property> propertiesRowMapper() {
    return (r, _) -> new Property(
      r.getInt("id"),
      r.getString("name"),
      r.getInt("unit_id")
    );
  }
}
