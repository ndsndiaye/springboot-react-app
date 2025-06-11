package com.wingufactory.moodboard_backend.service;

import com.wingufactory.moodboard_backend.model.Feedback;
import com.wingufactory.moodboard_backend.repository.FeedbackRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private FeedbackService feedbackService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllFeedback() {
        
        Feedback feedback1 = new Feedback();
        feedback1.setUserName("Alice");
        feedback1.setComments("Super !");
        feedback1.setRating(5);
        
        Feedback feedback2 = new Feedback();
        feedback2.setUserName("Bob");
        feedback2.setComments("Great !");
        feedback2.setRating(4);
        
        List<Feedback> mockFeedbackList = Arrays.asList(feedback1, feedback2);
        
        
        when(feedbackRepository.findAll()).thenReturn(mockFeedbackList);
        
        
        List<Feedback> result = feedbackService.getAllFeedback();
        
        
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Alice", result.get(0).getUserName());
        assertEquals("Super !", result.get(0).getComments());
        assertEquals(5, result.get(0).getRating());
        assertEquals("Bob", result.get(1).getUserName());
        assertEquals("Great !", result.get(1).getComments());
        assertEquals(4, result.get(1).getRating());
        
        
        verify(feedbackRepository, times(1)).findAll();
    }

    
  
}
