package com.IT_JUN_WE_55_team.paf.service;

import java.util.List;
import java.util.Optional;

import com.IT_JUN_WE_55_team.paf.model.LearningPlan;

public interface LearningPlanService {

    List<LearningPlan> getAllLearningPlans();

    Optional<LearningPlan> getLearningPlanById(String id);

    LearningPlan createLearningPlan(LearningPlan learningPlan);

    LearningPlan updateLearningPlan(String learningPlanId, LearningPlan learningPlan);

    void deleteLearningPlan(String learningPlanId);

}
