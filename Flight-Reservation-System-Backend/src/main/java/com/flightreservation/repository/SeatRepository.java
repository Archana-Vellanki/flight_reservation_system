package com.flightreservation.repository;

import java.util.List;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Seat;
import com.flightreservation.model.Passenger;


@Repository
public interface SeatRepository extends JpaRepository<Seat, String> {

	List<Seat> findByFlight(FlightDetails flight);

	List<Seat> findBySeatNumber(String seatNumber);
	
	List<Seat> findByPassengerAndFlight(Passenger passenger, FlightDetails flight);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT s FROM Seat s WHERE s.seatNumber = :seatNumber and s.flight.flightNumber = :flightNumber")
	Seat findSingleSeatNumberWithLock(@Param("seatNumber") String seatNumber,
			@Param("flightNumber") String flightNumber);

}
