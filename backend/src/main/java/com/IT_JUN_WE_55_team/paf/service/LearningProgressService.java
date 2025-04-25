package com.IT_JUN_WE_55_team.paf.service;

import java.util.List;
import java.util.Optional;

import com.IT_JUN_WE_55_team.paf.model.LearningProgressUpdate;

public interface LearningProgressService {

    List<LearningProgressUpdate> getAllLearningStatus();

    Optional<LearningProgressUpdate> getLearningStatsusById(String statusId);

    LearningProgressUpdate createLearningStatus(LearningProgressUpdate learningProgressUpdate);

    LearningProgressUpdate updateLearningStatus(String updateId, LearningProgressUpdate learningProgressUpdate);

    void deleteLearningStatus(String statusId);

}