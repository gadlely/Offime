package practice.demo.entity.reports;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import practice.demo.common.reports.QuestionType;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @ManyToOne
    @JoinColumn(name = "TEMPLATE_ID", nullable = false)
    private Templates template;

    @Column(name = "TYPE")
    private QuestionType type;

    @Column(columnDefinition = "TEXT", name = "QUESTION_TEXT")
    private String questionText;

    @Column(name = "`ORDER`", nullable = false)
    private int order;
}
