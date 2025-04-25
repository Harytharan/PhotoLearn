package com.IT_JUN_WE_55_team.paf.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IT_JUN_WE_55_team.paf.model.LearningPlan;
import com.IT_JUN_WE_55_team.paf.service.LearningPlanService;

@RestController
@RequestMapping("/learningPlans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService learningPlanService;

    @GetMapping
    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanService.getAllLearningPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPlan> getLearningPlanById(@PathVariable String id) {
        Optional<LearningPlan> learningPlans = learningPlanService.getLearningPlanById(id);
        return learningPlans.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<LearningPlan> createLearningPlan(@RequestBody LearningPlan learningPlan) {
        LearningPlan savedLearningPlan = learningPlanService.createLearningPlan(learningPlan);
        return new ResponseEntity<>(savedLearningPlan, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPlan> updateLearning(@PathVariable String id,
                                                      @RequestBody LearningPlan learningPlan) {
        LearningPlan updatedLearningPlan = learningPlanService.updateLearningPlan(id, learningPlan);
        if (updatedLearningPlan != null) {
            return new ResponseEntity<>(updatedLearningPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{learningPlanId}")
    public ResponseEntity<Void> deleteLearningPlan(@PathVariable String learningPlanId) {
        learningPlanService.deleteLearningPlan(learningPlanId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
