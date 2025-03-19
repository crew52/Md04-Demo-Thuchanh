package codegym.c10.assignmentdemo.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "computer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Computer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Code không được để trống")
    @Size(max = 10, message = "Code không được dài quá 10 ký tự")
    @Column(nullable = false, unique = true)
    private String code;

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 10, message = "Tên không được dài quá 10 ký tự")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Nhà sản xuất không được để trống")
    @Size(max = 10, message = "Nhà sản xuất không được dài quá 10 ký tự")
    @Column(nullable = false)
    private String producer;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
}