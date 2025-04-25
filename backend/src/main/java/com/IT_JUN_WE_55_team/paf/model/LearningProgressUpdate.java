package com.IT_JUN_WE_55_team.paf.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "learningProgressUpdate")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class LearningProgressUpdate {

    @Id
    private String updateId;
    private String userId;
    private String topicLearned;
    private int hoursSpent;
    private String conceptsCovered;
    private String keyLearnings;
    private String challengesFaced;
    private String resourcesUsed;
    private String date;
    private String username;
    private String userProfile;

}

