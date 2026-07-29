package nl.furka.foodie.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FoodService {




    public List<String> getFoods(){

        var ingredientList = new ArrayList<String>();
        
        var ingredient = "Furka";

        ingredientList.add(ingredient);
        
        return ingredientList;
    }
    
}
