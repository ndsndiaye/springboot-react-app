import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Typography, Rating, Avatar } from '@mui/material';

function FeedbackDashboard() {
    const [feedbackList, setFeedbackList] = useState([]);

    const getApiUrl = () => {
        const hostname = window.location.hostname;
        
        if (hostname.includes('fasttrack-prod')) {
            return 'http://fasttrack-api-prod.moodapp.io/api';
        }
        
        if (hostname.includes('fasttrack-staging')) {
            return 'http://fasttrack-api-staging.moodapp.io/api';
        }
        
       return 'http://fasttrack-api-staging.moodapp.io/api';
    };

    const apiUrl = getApiUrl();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/feedback`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setFeedbackList(data);
        } catch (error) {
            console.error('Error fetching feedback data:', error);
        }
    }, [apiUrl]); 

    useEffect(() => {
        console.log('Using API URL:', apiUrl);
    }, [apiUrl]);

    useEffect(() => {
        fetchData();
    
        const intervalId = setInterval(() => {
          fetchData();
        }, 5000); 
    
        return () => clearInterval(intervalId); 
    }, [fetchData]); 

    const averageRating = () => {
        if (feedbackList.length === 0) return 0;
        const total = feedbackList.reduce((acc, feedback) => acc + feedback.rating, 0);
        return (total / feedbackList.length).toFixed(2);
    };

    return (
        <Row>
            <Col md={12} className="mb-12">
                <Typography variant="h5" gutterBottom> Mood Average </Typography>
                <Rating 
                    name="read-only" 
                    value={parseFloat(averageRating())} 
                    readOnly 
                /> 
           
                <hr></hr>
                <br></br> <br></br>
                <ListGroup>
                    {feedbackList.length === 0 ? (
                        <ListGroup.Item>No feedback yet.</ListGroup.Item>
                        ) : (
                        feedbackList.map((fb, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-start">
                                <Avatar alt={fb.userName} src=""className="me-3" />
                                <div>
                                    <Typography variant="h6" className="mb-0">{fb.userName}</Typography>
                                    <Rating name="read-only" value={fb.rating} readOnly />
                                    <Typography variant="body2">{fb.comments}</Typography>
                                </div>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            </Col>
        </Row>
    );
}

export default FeedbackDashboard;
