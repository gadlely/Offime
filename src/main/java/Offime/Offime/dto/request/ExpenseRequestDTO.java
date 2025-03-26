package Offime.Offime.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ExpenseRequestDTO {

    private String title;
    private String content;
    private double amount;
    private String category;
    private List<MultipartFile> images;  // 이미지 파일들
    @NotNull(message = "지출 날짜는 필수 항목입니다.")
    private LocalDate expenseDate;

}