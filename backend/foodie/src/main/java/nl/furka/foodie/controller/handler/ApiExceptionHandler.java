package nl.furka.foodie.controller.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(IngredientAlreadyExistsException.class)
  public ResponseEntity<Map<String, Object>> onDuplicate(IngredientAlreadyExistsException ex) {
    Map<String, Object> body = Map.of(
      "error", "ingredient_already_exists",
      "message", ex.getMessage()
    );
    return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> onOther(Exception ex) {
    Map<String, Object> body = Map.of(
      "error", "internal_server_error",
      "message", "Unexpected error"
    );
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
  }
}
