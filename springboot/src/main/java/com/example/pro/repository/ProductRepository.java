package com.example.pro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.pro.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long CategoryId);

    @Query(value = "SELECT * FROM product WHERE MATCH(name, description) AGAINST(:keyword IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    List<Product> fullTextSearch(@Param("keyword") String keyword);

    // Full-text search with Boolean mode and relevance scoring
    @Query(value = "SELECT *, " +
            "MATCH(name) AGAINST(:keyword IN BOOLEAN MODE) * 2 AS name_relevance, " +
            "MATCH(description) AGAINST(:keyword IN BOOLEAN MODE) AS description_relevance " +
            "FROM product " +
            "WHERE MATCH(name, description) AGAINST(:keyword IN BOOLEAN MODE) " +
            "ORDER BY (name_relevance + description_relevance) DESC",
            nativeQuery = true)
    List<Product> searchWithRelevance(@Param("keyword") String keyword);
}
