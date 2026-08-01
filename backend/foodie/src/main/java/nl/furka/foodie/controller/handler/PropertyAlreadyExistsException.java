package nl.furka.foodie.controller.handler;

public class PropertyAlreadyExistsException extends RuntimeException {
  public PropertyAlreadyExistsException(String message) {
    super(message);
  }
}
