package com.example.backend.repository;

import com.example.backend.entity.GachaHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GachaHistoryRepository extends JpaRepository<GachaHistory, Long> {

    List<GachaHistory> findByUserId(Long user_id);

}