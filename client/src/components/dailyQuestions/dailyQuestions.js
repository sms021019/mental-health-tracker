import React, { useState } from 'react';
import { 
  Button, 
  Box, 
  TextField,
  LinearProgress,
  Typography,
} from '@mui/material';

import '../../App.css';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const DailyQuestions = () => {
  const [questions, setQuestions] = useState(["1","2","3","4","5"]);  // TODO : Get questions from back
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / (totalQuestions - 1)) * 100;

  const handleAnswerChange = (event) => {
    const newAnswers = {
      ...answers,
      [currentQuestionIndex]: event.target.value,
    };
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting questions:', questions);
    // Functionality to send the questions to a server or API
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isAnswerEmpty = !answers[currentQuestionIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center', 
        height: '100vh', 
        bgcolor: 'var(--main-bg-color)', 
      }}
    >
      
      <Box sx={{ p: 2, width: '100%', maxWidth: '600px', mx: 'auto' }}> 
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
        <h2 style={{ textAlign: 'center' }}>{questions[currentQuestionIndex]}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <TextField
            fullWidth
            label="Your Answer"
            variant="outlined"
            multiline
            rows={8} 
            value={answers[currentQuestionIndex] || ''}
            onChange={handleAnswerChange}
            sx={{ mb: 2, backgroundColor: 'white'}} 
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
            <Button variant="contained" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Previous
            </Button>
            {isLastQuestion ? (
              <Button type="submit" variant="contained" disabled={isAnswerEmpty}>
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained" disabled={isAnswerEmpty}>
                Next
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default DailyQuestions;
