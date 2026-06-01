package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.GachaHistory;
import java.util.List;

public interface GachaHistoryRepository extends JpaRepository<GachaHistory, Long> {

    List<GachaHistory> findByUserId(Long user_id);
}