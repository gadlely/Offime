package Offime.Offime.entity.attendance;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class HolidayEntity {
    @Id
    private String date;

    private String name;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}