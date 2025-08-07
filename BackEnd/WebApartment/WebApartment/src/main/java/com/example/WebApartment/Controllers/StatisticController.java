package com.example.WebApartment.Controllers;

import com.example.WebApartment.DTO.StatisticDTO;
import com.example.WebApartment.Models.Statistic;
import com.example.WebApartment.Services.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/statistic")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @PostMapping("")
    public ResponseEntity<Statistic> createStatistic(@RequestBody StatisticDTO dto) {
        return ResponseEntity.ok(statisticService.createStatistic(dto));
    }

    @GetMapping("")
    public ResponseEntity<List<Statistic>> getAllStatistics() {
        return ResponseEntity.ok(statisticService.getAllStatistics());
    }

    @GetMapping("/calculated")
    public ResponseEntity<Statistic> getCalculatedStatistic() {
        return ResponseEntity.ok(statisticService.getCalculatedStatistic());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Statistic> updateStatistic(@PathVariable Long id, @RequestBody StatisticDTO dto) {
        return ResponseEntity.ok(statisticService.updateStatistic(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStatistic(@PathVariable Long id) {
        statisticService.deleteStatistic(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
