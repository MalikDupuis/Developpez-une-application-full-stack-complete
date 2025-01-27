package com.openclassrooms.mddapi.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import com.openclassrooms.mddapi.models.Theme;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long themeId;
    private String title;
    private long authorId;
    private String content;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date")
    private Date created;
}
