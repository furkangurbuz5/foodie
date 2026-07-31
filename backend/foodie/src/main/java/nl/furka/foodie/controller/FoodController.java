package nl.furka.foodie.controller;

import java.net.URI;
import java.util.List;

import nl.furka.foodie.model.Ingredient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import nl.furka.foodie.service.FoodService;

@RestController("/api")
public class FoodController {

  FoodService foodService;

  FoodController(
    FoodService foodService
  ) {
    this.foodService = foodService;
  }

  @PostMapping("ingredient")
  public ResponseEntity<?> addIngredient(
    @RequestBody Ingredient ingredient
  ) {
    try {
      var created = this.foodService.addIngredient(ingredient);
      URI location = URI.create("ingredients/" + created.id());
      return ResponseEntity.created(location).body(created); // 201 + body
    } catch (RuntimeException e) {
      return ResponseEntity.status(409).body(e.getMessage());
    }
  }

  @PostMapping("property")
  public ResponseEntity<Ingredient.Properties> addProperty(
    @RequestBody Ingredient.Properties property
  ) {
    var added = this.foodService.addProperty(property);

    URI location = URI.create("property/" + added.id());
    return ResponseEntity.created(location).body(added);

  }

  @GetMapping("ingredients")
  ResponseEntity<List<String>> getIngredients() {
    return ResponseEntity.ok(

      foodService.getFoods()

    );
  }
}
