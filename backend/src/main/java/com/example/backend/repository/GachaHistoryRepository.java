package com.example.backend.repository;

import com.example.backend.entity.GachaHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GachaHistoryRepository extends JpaRepository<GachaHistory, Long> {

    List<GachaHistory> findByUserId(@Param("userId") Long userId);

}