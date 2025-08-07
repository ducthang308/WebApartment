package com.example.WebApartment.Services.Implements;

import com.example.WebApartment.DTO.StatisticDTO;
import com.example.WebApartment.Models.Statistic;

import java.util.List;

public interface IStatisticService {
    Statistic createStatistic(StatisticDTO dto);
    List<Statistic> getAllStatistics();
    Statistic updateStatistic(Long id, StatisticDTO dto);
    void deleteStatistic(Long id);
    Statistic getCalculatedStatistic();
}
