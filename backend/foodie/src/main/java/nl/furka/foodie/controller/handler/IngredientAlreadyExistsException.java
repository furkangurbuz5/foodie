package nl.furka.foodie.controller.handler;

public class IngredientAlreadyExistsException extends RuntimeException {
  public IngredientAlreadyExistsException(String msg) {
    super(msg);
  }
}
