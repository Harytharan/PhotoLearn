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

import com.IT_JUN_WE_55_team.paf.model.LearningProgressUpdate;
import com.IT_JUN_WE_55_team.paf.service.LearningProgressService;

@RestController
@RequestMapping("/learningStatus")
public class LearningProgressController {

    @Autowired
    private LearningProgressService learningProgressService;

    @GetMapping
    public List<LearningProgressUpdate> getAllLearningStatus() {
        return learningProgressService.getAllLearningStatus();
    }

    @GetMapping("/{statusId}")
    public ResponseEntity<LearningProgressUpdate> getLearningstatusById(@PathVariable String statusId) {
        Optional<LearningProgressUpdate> learningProgressUpdate = learningProgressService.getLearningStatsusById(statusId);
        return learningProgressUpdate.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<LearningProgressUpdate> createLearningStatus(@RequestBody LearningProgressUpdate learningProgressUpdate) {
        LearningProgressUpdate savedLearningProgressUpdate = learningProgressService.createLearningStatus(learningProgressUpdate);
        return new ResponseEntity<>(savedLearningProgressUpdate, HttpStatus.CREATED);
    }

    @PutMapping("/{statusId}")
    public ResponseEntity<LearningProgressUpdate> updateLearningStatus(@PathVariable String statusId,
                                                                      @RequestBody LearningProgressUpdate learningProgressUpdate) {
        LearningProgressUpdate updateLearningProgressUpdate = learningProgressService.updateLearningStatus(statusId, learningProgressUpdate);
        if (updateLearningProgressUpdate != null) {
            return new ResponseEntity<>(updateLearningProgressUpdate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{statusId}")
    public ResponseEntity<Void> deleteLearningStatus(@PathVariable String statusId) {
        learningProgressService.deleteLearningStatus(statusId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}