package com.IT_JUN_WE_55_team.paf.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "learningPlan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningPlan {

    @Id
    private String learningPlanId;
    private String userId;
    private String learningPlanName;
    private String subjects;
    private int hoursPerDay;
    private String schedule;
    private String description;
    private String date;
    private String username;
    private String userProfile;
}

