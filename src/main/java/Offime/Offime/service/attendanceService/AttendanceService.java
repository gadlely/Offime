package Offime.Offime.service.attendanceService;

import Offime.Offime.dto.attendanceDto.request.ReqClockInDto;
import Offime.Offime.dto.attendanceDto.request.ReqClockOutDto;
import Offime.Offime.dto.attendanceDto.request.ReqOutOfOfficeDto;
import Offime.Offime.dto.attendanceDto.request.ReqReturnToOfficeDto;
import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.repository.attendanceRepository.EventRecordRepository;
import Offime.Offime.repository.attendanceRepository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static Offime.Offime.entity.attendanceEntity.EventType.*;
import static java.time.LocalTime.now;

@Slf4j
@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final EventRecordRepository eventRecordRepository;
    private final MemberRepository memberRepository;

    private static final double EARTH_RADIUS = 6371.0088;       // 지구 평균 반지름(km)
    private static final double COMPANY_LATITUDE = 37.482175;   // 구트 아카데미 위도
    private static final double COMPANY_LONGITUDE = 126.898233; // 구트 아카데미 경도
    private static final int MAX_DISTANCE = 50;                 // 허용할 최대 거리(m)
    private static final LocalTime COMPANY_START_TIME = LocalTime.of(9, 0);  // 출근 시간
    private static final LocalTime COMPANY_END_TIME = LocalTime.of(18, 0);   // 퇴근 시간

    @Transactional
    public void clockIn(ReqClockInDto dto, LocalDateTime now) {
        if (!isInDistance(dto.getLatitude(), dto.getLongitude())) {
            throw new IllegalArgumentException(" - " + "허용 범위를 벗어났습니다.");
        }
        long lateMinutes = late(now);
        EventRecord eventRecord = ReqClockInDto.toEntity(lateMinutes);
        eventRecordRepository.save(eventRecord);
    }

    @Transactional
    public void returnToOffice(ReqReturnToOfficeDto dto, LocalDateTime now) {
        if (!isInDistance(dto.getLatitude(), dto.getLongitude())) {
            throw new IllegalArgumentException(" - " + "허용 범위를 벗어났습니다.");
        }
        LocalDate today = now.toLocalDate();
        EventRecord clockInRecord = eventRecordRepository.findByDateAndEventType(today, 출근)
                .orElseThrow(() -> new IllegalStateException("오늘의 출근 기록이 없습니다."));
        EventRecord eventRecord = ReqReturnToOfficeDto.toEntity(clockInRecord);
        eventRecordRepository.save(eventRecord);
    }

    @Transactional
    public void outOfOffice(ReqOutOfOfficeDto dto, LocalDateTime now) {
        LocalDate today = now.toLocalDate();
        EventRecord clockInRecord = eventRecordRepository.findByDateAndEventType(today, 출근)
                .orElseThrow(() -> new IllegalStateException("오늘의 출근 기록이 없습니다."));

    EventRecord eventRecord = ReqOutOfOfficeDto.toEntity(dto, clockInRecord);
    eventRecordRepository.save(eventRecord);
    }

    @Transactional
    public void clockOut(ReqClockOutDto dto, LocalDateTime now) {
        LocalDate today = now.toLocalDate();
        EventRecord clockInRecord = eventRecordRepository.findByDateAndEventType(today, 출근)
                .orElseThrow(() -> new IllegalStateException("오늘의 출근 기록이 없습니다."));

        long leaveEarlyMinutes = leaveEarly(now);
        EventRecord eventRecord = ReqClockOutDto.toEntity(clockInRecord, leaveEarlyMinutes);

        eventRecordRepository.findByDateAndEventType(today, 출근)
                .ifPresent(record -> {
                    record.updateClockOut(now());
                    record.updateLeaveEarly(leaveEarly(now));
                });
        eventRecordRepository.findByDateAndEventType(today, 자리비움)
                .ifPresent(record -> {
                    record.updateClockOut(now());
                    record.updateLeaveEarly(leaveEarly(now));
                });
        eventRecordRepository.findByDateAndEventType(today, 복귀)
                .ifPresent(record -> {
                    record.updateClockOut(now());
                    record.updateLeaveEarly(leaveEarly(now));
                });

        eventRecordRepository.save(eventRecord);
    }

    //private 메소드=========================================================================================
    private long late(LocalDateTime clockInTime) {
        LocalTime Time = clockInTime.toLocalTime();
        if (Time.isAfter(COMPANY_START_TIME)) {
            Duration duration = Duration.between(COMPANY_START_TIME, Time);
            return duration.toMinutes();
        }
        return 0;
    }

    private long leaveEarly(LocalDateTime clockOutTime) {
        LocalTime Time = clockOutTime.toLocalTime();
        if (Time.isBefore(COMPANY_END_TIME)) {
            Duration duration = Duration.between(Time, COMPANY_END_TIME);
            return duration.toMinutes();
        }
        return 0;
    }

    private boolean isInDistance(double latitude, double longitude) {
        double distance = calculateDistance(COMPANY_LATITUDE, COMPANY_LONGITUDE, latitude, longitude);
        return distance <= MAX_DISTANCE;
    }

    // 하버사인 공식 - 구면 위 두 개의 좌표(위도, 경도) 사이의 거리를 구하는 메소드
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // 위도와 경도 차이를 라디안으로 변환
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        // 하버사인 공식 적용
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        // 중심각 계산
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // 최종 거리 계산
        double distance = EARTH_RADIUS * c * 1000; // 미터로 변환
        log.info("거리 : "  + String.format("%.3f", distance) + "미터.");
        return distance;
    }
//    public List<Long> getTimeDifference(LocalDate localDate) {
//        // 해당 날짜의 모든 기록 가져오기
//        List<EventRecord> eventRecords = eventRecordRepository.findByDate(localDate);
//
//        // 기록이 없거나 하나만 있으면 시간 차이를 계산할 수 없으므로 빈 리스트 반환
//        if (eventRecords == null || eventRecords.size() <= 1) {
//            return new ArrayList<>();
//        }
//        // 기록을 requestTime 기준으로 정렬
//        eventRecords.sort(Comparator.comparing(EventRecord::getRequestTime));
//        // 시간 차이를 저장할 리스트 생성
//        List<Long> timeDifference = new ArrayList<>();
//        // 각 기록 사이의 시간 차이를 계산
//        for (int i = 1; i < eventRecords.size(); i++) {
//            EventRecord previous = eventRecords.get(i - 1);
//            EventRecord current = eventRecords.get(i);
//
//            // 이전 기록과 현재 기록 사이의 시간 차이 계산 (분 단위)
//            Duration duration = Duration.between(previous.getRequestTime(), current.getRequestTime());
//            long minutesDifference = duration.toMinutes();
//
//            timeDifference.add(minutesDifference);
//        }
//        return timeDifference;
//    }
}