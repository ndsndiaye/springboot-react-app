import React from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackDashboard from './FeedbackDashboard';
import { Container, Row, Col} from 'react-bootstrap';
import { Typography, Box, IconButton } from '@mui/material';
import { Feedback } from '@mui/icons-material';

function App() {
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

    const handleFeedbackSubmit = (feedback) => {
        console.log('Submitting feedback to:', `${apiUrl}/feedback`);
        
        fetch(`${apiUrl}/feedback`, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error submitting feedback:', error);
                console.error('URL used:', `${apiUrl}/feedback`);
            });
    };

    return (
        <Container fluid className="p-4">
            <Row>
                <Col md={4} className="mb-4">
                    <Typography variant="h4" gutterBottom>
                    What's your mood?
                    </Typography>
                    <FeedbackForm onSubmit={handleFeedbackSubmit} />
                </Col>
                <Col md={8} className="mb-8">
                <Box display="flex" alignItems="center" mb={4}>
                    <IconButton color="primary">
                        <Feedback fontSize="large" />
                    </IconButton>
                    <Typography variant="h4" component="h1" marginLeft={2}>
                        My Awesome Mood Board
                    </Typography>
                </Box>
                    <FeedbackDashboard />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
