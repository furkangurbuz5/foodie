package nl.furka.foodie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import nl.furka.foodie.service.FoodService;

@RestController("/")
public class FoodController {

    FoodService foodService;

    FoodController(
        FoodService foodService
    ){
        this.foodService = foodService;
    }

    @GetMapping("ingredients")
    ResponseEntity<List<String>> getIngredients(){
        return ResponseEntity.ok(

            foodService.getFoods()
            
        );
    }
}
