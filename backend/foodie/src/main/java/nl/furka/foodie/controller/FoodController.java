package nl.furka.foodie.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import nl.furka.foodie.dto.CreateIngredientPropertyRequest;
import nl.furka.foodie.dto.CreateIngredientRequest;
import nl.furka.foodie.model.Ingredient;
import nl.furka.foodie.model.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import nl.furka.foodie.service.FoodService;

@RestController
@RequestMapping("/api")
public class FoodController {

  FoodService foodService;

  FoodController(
    FoodService foodService
  ) {
    this.foodService = foodService;
  }

  @PostMapping("/ingredient")
  public ResponseEntity<Ingredient> addIngredient(
    @RequestBody CreateIngredientRequest ingredient
  ) {
    var created = foodService.addIngredient(ingredient);
    URI location = URI.create("/api/ingredients/" + created.id());
    return ResponseEntity.created(location).body(created);
  }

  @PostMapping("/property")
  public ResponseEntity<Ingredient.Properties> addProperty(
    @RequestBody CreateIngredientPropertyRequest property
  ) {
    var added = foodService.addProperty(property);

    URI location = URI.create("property/" + added.id());
    return ResponseEntity.created(location).body(added);

  }

  @GetMapping("/ingredients")
  ResponseEntity<List<Ingredient>> getIngredients() {
    return ResponseEntity.ok(
      foodService.getIngredients()
    );
  }

  @GetMapping("/ingredient/{id}")
  ResponseEntity<Page<Ingredient>> getIngredientByIdPathVariable(
    @PathVariable UUID id
  ) {
    return ResponseEntity.ok(
      new Page<>(
        foodService.getIngredientById(id),
        0,
        0,
        1,
        1
      )
    );
  }

  @GetMapping("/ingredient")
  ResponseEntity<Page<Ingredient>> getIngredientById(
    @RequestParam UUID id
  ) {
    return ResponseEntity.ok(
      new Page<>(
        foodService.getIngredientById(id),
        0,
        0,
        1,
        1
      )
    );
  }

  @GetMapping("/properties")
  ResponseEntity<List<Ingredient.Properties>> getProperties() {
    return ResponseEntity.ok(foodService.getProperties());
  }
}
