package com.flightreservation.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightreservation.dto.ReservationDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Passenger;
import com.flightreservation.model.Payment;
import com.flightreservation.model.Reservation;
import com.flightreservation.model.Seat;
import com.flightreservation.repository.BookingRepository;
import com.flightreservation.repository.PassengerRepository;
import com.flightreservation.repository.PaymentRepository;
import com.flightreservation.repository.ReservationRepository;
import com.flightreservation.repository.SeatRepository;
import com.flightreservation.service.ManageReservationService;
import com.flightreservation.service.PaymentService;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	PaymentRepository paymentRepository;

	@Autowired
	private SeatRepository seatRepository;

	@Autowired
	private PassengerRepository passengerRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	ManageReservationService manageReservationService;

	@Transactional
	@Override
	public ReservationDto makePayemntAndCreateReservation(Payment payment, int userId, String flightNumber,
			String seatNumber) {
		Seat seat = seatRepository.findSingleSeatNumberWithLock(seatNumber, flightNumber);
		Passenger passenger = passengerRepository.findById(userId).get();
		if (payment.getTotalTravelFair() == -1) {
			seat.setBooked(false);
			Seat seatResult = seatRepository.save(seat);
			return null;
		}
		if (payment.getTotalTravelFair() == 0) {
			payment.setTotalTravelFair(seat.getPrice());
		}

		payment.setFlightNumber(flightNumber);
		paymentRepository.save(payment);
		passenger.getPayment().add(payment);
		passengerRepository.save(passenger);

		seat.setBooked(true);
		seat.setPassenger(passenger);
		Seat seatResult = seatRepository.save(seat);

		bookingRepository.updateSeatAvailabilityByFlightNumber(seat.getFlight().getSeatAvailability() - 1,
				flightNumber);

		// create reservation
		return createReservation(flightNumber, passenger);
	}

	private ReservationDto createReservation(String flightNumber, Passenger passenger) {

		FlightDetails flightDetails = bookingRepository.findByFlightNumber(flightNumber);
		Reservation reservation = new Reservation();
		reservation.setArrival(flightDetails.getArrival());
		reservation.setDeparture(flightDetails.getDeparture());
		reservation.setPassenger(passenger);
		reservation.setFlight(flightDetails);
		Reservation reservationResult = reservationRepository.save(reservation);

		return manageReservationService.getOneReservation(reservationResult.getBookingId(), passenger.getUserId());

	}

}
