package nl.furka.foodie.repository;

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

  public void storeIngredient(Ingredient ingredient) throws RuntimeException {
    String sql = "INSERT INTO ingredient (id, name, properties_id) VALUES (?, ?, ?);";

    try {
      jdbcClient.sql(sql)
        .param(ingredient.id())
        .param(ingredient.name())
        .param(ingredient.propertiesId())
        .update();
    } catch (Exception e) {
      throw new RuntimeException("Ingredient already exists");
    }
  }

  public void storeProperty(Ingredient.Properties property) {
    String sql = "INSERT INTO properties (id, name, unit, category) VALUES (?, ?, ?, ?);";

    jdbcClient.sql(sql)
      .param(property.id())
      .param(property.name())
      .param(property.unit())
      .param(property.category())
      .update();
  }

  public List<Ingredient.Properties> getProperties() {
    String sql = "SELECT * FROM properties;";

    return jdbcClient.sql(sql)
      .query(propertiesRowMapper())
      .list();

  }

  private RowMapper<Ingredient.Properties> propertiesRowMapper() {
    return (r, i) -> new Ingredient.Properties(
      r.getInt("id"),
      r.getString("name"),
      r.getString("unit"),
      r.getString("category")
    );
  }
}
