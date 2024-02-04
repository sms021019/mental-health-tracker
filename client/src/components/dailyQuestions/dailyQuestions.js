import React, { useState, useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { updateUserAPIMethod } from "../../api/client";
import { useNavigate } from "react-router-dom";

import "../../App.css";
import "./dailyQuestions.css";
import questionSet from "./questionSet.json";
import Lottie from "lottie-react";
import FacialExpression from "../../assets/lottie/FacialExpression.json";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.value
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

  const btnStyle = disabled ? { pointerEvents: "none", opacity: 0.5 } : {};

  return (
    <div className="btn_container" onClick={handleClick} style={btnStyle}>
      {text}
    </div>
  );
};

function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const selectRandomQuestions = () => {
  const questionEntries = Object.entries(questionSet);
  const shuffledQuestions = shuffleArray(questionEntries);
  const selectedQuestions = shuffledQuestions.slice(0, 5);

  return selectedQuestions;
};

const DailyQuestions = () => {
  const [questions, setQuestions] = useState(selectRandomQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const valueFromLocalStorage = localStorage.getItem("token");
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  useEffect(() => {
    setQuestions(selectRandomQuestions());
  }, []);

  const handleAnswerChange = (event) => {
    // const newAnswers = {
    //   ...answers,
    //   [currentQuestionIndex]: event.target.value,
    // };
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = event.target.value;
      return updatedAnswers;
    });
  };

  const handleSubmit = async (event) => {
    console.log("Submitting answers:", answers);
    const newObject = {
      datetime: new Date(),
      questions_index: [],
      answers: answers,
      answer_prob: [],
      stress_point: 0,
    };

    const uData = { userData: [newObject] };

    try {
      // Use formData instead of user for the update
      const res = await updateUserAPIMethod(valueFromLocalStorage, uData);
      if (res.ok) {
        const jsonResult = await res.json();
        console.log(jsonResult);
        navigate("/dashboard"); // Navigate on successful update
      } else {
        // Handle non-ok responses here, if needed
        console.error("Failed to submit answers");
      }
    } catch (error) {
      console.error("Error submitting user:", error);
      // Handle the error appropriately here
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isAnswerEmpty = !answers[currentQuestionIndex];

  return (
    <>
      <div className="lottie_container">
        <Lottie
          style={{ width: "20rem", height: "20rem" }}
          animationData={FacialExpression}
        />
      </div>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "var(--main-bg-color)",
        }}
      > */}
      <Box sx={{ p: 2, width: "100%", maxWidth: "600px", mx: "auto" }}>
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
        <h2 style={{ textAlign: "center" }}>
          {questions[currentQuestionIndex][1]}
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <textarea
            placeholder="Your Answer"
            className="input"
            name="text"
            onChange={handleAnswerChange}
            value={answers[currentQuestionIndex] || ""}
            style={{ height: "10rem", padding: "2rem" }}
          />
        </form>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 2,
          }}
        >
          <Button
            text={"Previous"}
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          />
          {isLastQuestion ? (
            <Button
              text={"Submit"}
              onClick={handleSubmit}
              disabled={isAnswerEmpty}
            />
          ) : (
            <Button
              text={"Next"}
              onClick={handleNext}
              disabled={isAnswerEmpty}
            />
          )}
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default DailyQuestions;
