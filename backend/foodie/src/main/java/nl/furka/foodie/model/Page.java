package nl.furka.foodie.model;

public record Page<T>(
  T item,
  int size,
  int number,
  int totalElements,
  int totalPages
) {
}
