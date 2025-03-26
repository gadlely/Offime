package Offime.Offime.repository;

import Offime.Offime.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUsername(String username);

    // 검색 기능을 위한 쿼리 메서드
    @Query("SELECT e FROM Expense e WHERE " +
            "(:searchTerm IS NULL OR " +
            "e.title LIKE %:searchTerm% OR " +
            "e.username LIKE %:searchTerm% OR " +
            "e.category LIKE %:searchTerm% OR " +
            "e.content LIKE %:searchTerm% OR " +
            "CAST(e.amount AS string) LIKE %:searchTerm%)")
    List<Expense> searchExpenses(@Param("searchTerm") String searchTerm);

}
