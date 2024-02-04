import React, { 
  useState,
  useEffect 
} from 'react';
import {  
  Box, 
  LinearProgress,
  Typography,
} from '@mui/material';

import '../../App.css';
import "./dailyQuestions.css";

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

const Button = ({ text, onClick, disabled }) => {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return; 
    }
    onClick(); 
  };

  const btnStyle = disabled ? { pointerEvents: 'none', opacity: 0.5 } : {};

  return (
    <div className="btn_container" onClick={handleClick} style={btnStyle}>
      {text}
    </div>
  );
};

function shuffleArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const selectRandomQuestions = () => shuffleArray([...allQuestions]).slice(0, 5);

const allQuestions = [
  "Question 1", "Question 2", "Question 3",  "Question 4",  "Question 5" ,
   "Question 6" , "Question 7" , "Question 8" , "Question 9" , "Question 10"
];

const DailyQuestions = () => {
  const [questions, setQuestions] = useState(selectRandomQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});


  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / (totalQuestions - 1)) * 100;

  useEffect(() => {
    setQuestions(selectRandomQuestions());
  }, []);

  const handleAnswerChange = (event) => {
    const newAnswers = {
      ...answers,
      [currentQuestionIndex]: event.target.value,
    };
    setAnswers(newAnswers);
  };


  const handleSubmit = async (event) => {
    // event.preventDefault(); // This is crucial to prevent form from actually submitting and reloading the page.
    console.log('Submitting answers:', answers);
    try {
      // Example: Send answers to your server
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });
      const data = await response.json();
      console.log('Submission successful', data);
      // Handle success (e.g., navigate to a different page or show a success message)
    } catch (error) {
      console.error('Submission failed', error);
      // Handle error (e.g., show an error message)
    }
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
        <textarea
          placeholder="Your Answer"
          className="input" // Use className instead of class for JSX
          name="text"
          onChange={handleAnswerChange} 
          value={answers[currentQuestionIndex] || ''}
        />
        </form>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
            <Button text={"Previous"} onClick={handlePrev} disabled={currentQuestionIndex === 0}/>
            {isLastQuestion ? (
              <Button text={"Submit"} onClick={handleSubmit} disabled={isAnswerEmpty}/>
            ) : (
              <Button text={"Next"} onClick={handleNext} disabled={isAnswerEmpty}/>
            )}
          </Box>
      </Box>
    </Box>
  );
};

export default DailyQuestions;