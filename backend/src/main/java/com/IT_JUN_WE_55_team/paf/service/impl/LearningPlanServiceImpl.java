package com.IT_JUN_WE_55_team.paf.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IT_JUN_WE_55_team.paf.model.User;
import com.IT_JUN_WE_55_team.paf.model.LearningPlan;
import com.IT_JUN_WE_55_team.paf.repo.UserRepository;
import com.IT_JUN_WE_55_team.paf.repo.LearningPlanRepository;
import com.IT_JUN_WE_55_team.paf.service.LearningPlanService;

@Service
public class LearningPlanServiceImpl implements LearningPlanService {

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanRepository.findAll();
    }

    @Override
    public Optional<LearningPlan> getLearningPlanById(String id) {
        return learningPlanRepository.findById(id);
    }

    @Override
    public LearningPlan createLearningPlan(LearningPlan learningPlan) {
        Optional<User> userOptional = userRepository.findById(learningPlan.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            learningPlan.setUserId(user.getId());
            learningPlan.setUsername(user.getName());
            learningPlan.setUserProfile(user.getProfileImage());
            return learningPlanRepository.save(learningPlan);
        } else {
            return null;
        }
        
    }

    @Override
    public LearningPlan updateLearningPlan(String learningPlanId, LearningPlan learningPlan) {
        if (learningPlanRepository.existsById(learningPlanId)) {
            Optional<User> userOptional = userRepository.findById(learningPlan.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                learningPlan.setUserId(user.getId());
                learningPlan.setUsername(user.getName());
                learningPlan.setUserProfile(user.getProfileImage());
                learningPlan.setLearningPlanId(learningPlanId); // Correct ID
                learningPlan.setLearningPlanName(learningPlan.getLearningPlanName());
                learningPlan.setSubjects(learningPlan.getSubjects());
                learningPlan.setHoursPerDay(learningPlan.getHoursPerDay());
                learningPlan.setSchedule(learningPlan.getSchedule());
                learningPlan.setDate(learningPlan.getDate());
                learningPlan.setDescription(learningPlan.getDescription());
                return learningPlanRepository.save(learningPlan);
            } else {
                return null;
            }
        }
 else {
            return null;
        }
    }

    @Override
    public void deleteLearningPlan(String learningPlanId) {
        learningPlanRepository.deleteById(learningPlanId);
    }

}
