package com.IT_JUN_WE_55_team.paf.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IT_JUN_WE_55_team.paf.model.User;
import com.IT_JUN_WE_55_team.paf.model.LearningProgressUpdate;
import com.IT_JUN_WE_55_team.paf.repo.UserRepository;
import com.IT_JUN_WE_55_team.paf.repo.LearningProgressRepository;
import com.IT_JUN_WE_55_team.paf.service.LearningProgressService;

@Service
public class LearningProgressServiceImpl implements LearningProgressService {

    @Autowired
    private LearningProgressRepository learningProgressRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<LearningProgressUpdate> getAllLearningStatus() {
        return learningProgressRepository.findAll();
    }

    @Override
    public Optional<LearningProgressUpdate> getLearningStatsusById(String statusId) {
        return learningProgressRepository.findById(statusId);
    }

    @Override
    public LearningProgressUpdate createLearningStatus(LearningProgressUpdate learningProgressUpdate) {
        Optional<User> userOptional = userRepository.findById(learningProgressUpdate.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            learningProgressUpdate.setUserId(user.getId());
            learningProgressUpdate.setUsername(user.getName());
            learningProgressUpdate.setUserProfile(user.getProfileImage());
            return learningProgressRepository.save(learningProgressUpdate);
        } else {
            return null;
        }
    }

    @Override
    public LearningProgressUpdate updateLearningStatus(String updateId, LearningProgressUpdate learningProgressUpdate) {

        if (learningProgressRepository.existsById(updateId)) {
            Optional<User> userOptional = userRepository.findById(learningProgressUpdate.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                learningProgressUpdate.setUserId(user.getId());
                learningProgressUpdate.setUsername(user.getName());
                learningProgressUpdate.setUserProfile(user.getProfileImage());
                learningProgressUpdate.setUpdateId(updateId);
                learningProgressUpdate.setTopicLearned(learningProgressUpdate.getTopicLearned());
                learningProgressUpdate.setHoursSpent(learningProgressUpdate.getHoursSpent());
                learningProgressUpdate.setConceptsCovered(learningProgressUpdate.getConceptsCovered());
                learningProgressUpdate.setKeyLearnings(learningProgressUpdate.getKeyLearnings());
                learningProgressUpdate.setChallengesFaced(learningProgressUpdate.getChallengesFaced());
                learningProgressUpdate.setResourcesUsed(learningProgressUpdate.getResourcesUsed());
                learningProgressUpdate.setDate(learningProgressUpdate.getDate());
                return learningProgressRepository.save(learningProgressUpdate);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void deleteLearningStatus(String statusId) {
        learningProgressRepository.deleteById(statusId);
    }

}