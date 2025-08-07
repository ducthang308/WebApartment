package com.example.WebApartment.Services;

import com.example.WebApartment.DTO.StatisticDTO;
import com.example.WebApartment.Models.Statistic;
import com.example.WebApartment.Repositories.ListingRepository;
import com.example.WebApartment.Repositories.StatisticRepository;
import com.example.WebApartment.Repositories.UserRepository;
import com.example.WebApartment.Services.Implements.IStatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticService implements IStatisticService {

    private final StatisticRepository statisticRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    @Override
    public Statistic createStatistic(StatisticDTO dto) {
        Statistic statistic = Statistic.builder()
                .totalUsers(dto.getTotalUsers())
                .totalListing(dto.getTotalListing())
                .monthlyVisits(dto.getMonthlyVisits())
                .build();
        return statisticRepository.save(statistic);
    }

    @Override
    public List<Statistic> getAllStatistics() {
        return statisticRepository.findAll();
    }

    @Override
    public Statistic updateStatistic(Long id, StatisticDTO dto) {
        Statistic statistic = statisticRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Statistic not found with id: " + id));
        statistic.setTotalUsers(dto.getTotalUsers());
        statistic.setTotalListing(dto.getTotalListing());
        statistic.setMonthlyVisits(dto.getMonthlyVisits());
        return statisticRepository.save(statistic);
    }

    @Override
    public void deleteStatistic(Long id) {
        if (!statisticRepository.existsById(id)) {
            throw new RuntimeException("Statistic not found with id: " + id);
        }
        statisticRepository.deleteById(id);
    }

    @Override
    public Statistic getCalculatedStatistic() {
        return Statistic.builder()
                .totalUsers((int) userRepository.count())
                .totalListing((int) listingRepository.count())
                .monthlyVisits(0)
                .build();
    }
}
