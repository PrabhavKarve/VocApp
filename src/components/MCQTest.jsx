import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Paper,
  Box,
  
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { useLocation } from "react-router-dom";
import api_url from "../endpoint"

// CSS Styles
const styles = {
  container: {
    marginTop: "2rem",
  },
  paper: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#ffffff",
  },
  title: {
    fontWeight: "bold",
    color: "#4a4a4a",
    textAlign: "center",
  },
  questionTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  radioBox: (selected) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    border: `2px solid ${selected ? "#4caf50" : "#ccc"}`,
    borderRadius: "8px",
    padding: "0.75rem",
    cursor: "pointer",
    transition: "background-color 0.3s, border 0.3s, box-shadow 0.3s",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
    boxShadow: selected
      ? "0 0 8px rgba(76, 175, 80, 0.5)"
      : "none",
  }),
  radioCircle: (selected) => ({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: `2px solid ${selected ? "#4caf50" : "#ccc"}`,
    backgroundColor: selected ? "#4caf50" : "transparent",
    marginRight: "12px",
    boxShadow: selected ? "0 0 5px 2px rgba(76, 175, 80, 0.5)" : "none",
    transition: "box-shadow 0.3s, background-color 0.3s",
  }),
  newTestButton: {
    marginTop: "1rem",
    backgroundColor: "#2196F3",
    color: "white",
    padding: "0.75rem 2rem",
    borderRadius: "8px",
    boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
    transition: "background 0.3s, transform 0.2s",
    "&:hover": {
      backgroundColor: "#1976D2",
      transform: "scale(1.05)",
    },
    marginLeft: "1rem",
  },
  submitButton: {
    marginTop: "1rem",
    background: "linear-gradient(45deg, #ff6e40 30%, #ff8e53 90%)",
    color: "white",
    padding: "0.75rem 2rem",
    borderRadius: "8px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    transition: "background 0.3s, transform 0.2s",
    "&:hover": {
      background: "linear-gradient(45deg, #ff8e53 30%, #ff6e40 90%)",
      transform: "scale(1.05)",
    },
  },
  resultText: (isCorrect) => ({
    marginTop: "0.5rem",
    color: isCorrect ? "green" : "red",
    fontWeight: "bold",
  }),
};

const MCQTest = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [numQuestions, setNumQuestions] = useState(10); // State for number of questions
  const [level, setLevel] = useState(1);
  const location = useLocation();
  const { userName } = location.state || {};

  const handleSubmit2 = () => {
    const fetchQuestions = async () => {
        const response = await axios.post(api_url + "/getquestions", {
          no_of_questions: numQuestions,
          level_id: level,
        });
        setQuestions(response.data.questions);
      };
      fetchQuestions();
  };

  const handleOptionChange = (questionIndex, selectedOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    const results = questions.map((question, index) => ({
      isCorrect: question.choices[selectedOptions[index]] === question.answer,
    }));
    setResults(results);
    const totalCorrect = results.filter(result => result.isCorrect).length; // Calculate the total correct answers
    const score = `${totalCorrect}/${questions.length}`; // Format the score
    console.log(userName)

    try {
      await axios.post(api_url + "/putTestScores", {
        userid: userName,
        level_id: level, // Use the current level
        score: score,
      });
    } catch (error) {
      console.error("Error submitting test scores:", error);
      setErrorMessage("Failed to submit test scores.");
      return;
    }

      // Check if all questions are answered
    const unansweredQuestions = questions.some(
     (question, index) => selectedOptions[index] === undefined
    );

    if (unansweredQuestions) {
      setErrorMessage("Please answer all questions before submitting.");
      return;
    }
    setIsSubmitted(true);
    setErrorMessage(""); // Clear error message
  };

  const handleNewTest = () => {
    window.location.reload();
  };

  const calculateTotalCorrect = () => {
    return results.filter(result => result?.isCorrect).length;
  };

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Paper sx={styles.paper}>
        <Typography variant="h4" gutterBottom sx={styles.title}>
          MCQ Test
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="questions-label">Number of Questions</InputLabel>
        <Select
          labelId="questions-label"
          id="questions-select"
          defaultValue={10}
          onChange={(e) => setNumQuestions(e.target.value)}
          label="Number of Questions" // Fixes overlap
          sx={{ width: 200 }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>

      {/* Dropdown for Level */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="level-label">Level</InputLabel>
        <Select
          labelId="level-label"
          id="level-select"
          defaultValue={1}
          onChange={(e) => setLevel(e.target.value)}
          label="Level" // Fixes overlap
          sx={{ width: 200 }}
        >
          {Array.from({ length: 34 }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              Level {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ width: 200 }}
        onClick={handleSubmit2}
      >
        Submit
      </Button>
        {questions.map((question, index) => (
          <Box key={index} sx={{ marginBottom: "2rem" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={styles.questionTitle}
            >
              {index + 1}. {question.word}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedOptions[index] || ""}
                onChange={(event) =>
                  handleOptionChange(index, parseInt(event.target.value))
                }
              >
                {question.choices.map((choice, choiceIndex) => (
                  <FormControlLabel
                    key={choiceIndex}
                    value={choiceIndex}
                    control={
                      <Radio
                        sx={{
                          display: "none", // Hide the default radio button
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={styles.radioBox(
                          selectedOptions[index] === choiceIndex
                        )}
                        onClick={() => handleOptionChange(index, choiceIndex)}
                      >
                        <Box
                          sx={styles.radioCircle(
                            selectedOptions[index] === choiceIndex
                          )}
                        />
                        <Typography sx={{ fontSize: "1rem", color: "#333" }}>
                          {choice}
                        </Typography>
                      </Box>
                    }
                    sx={{ marginBottom: "1rem" }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            {isSubmitted && (
              <Typography
                variant="subtitle1"
                sx={styles.resultText(results[index]?.isCorrect)}
              >
                {results[index]?.isCorrect
                  ? "Correct!"
                  : `Incorrect. Correct Answer: ${question.answer}`}
              </Typography>
            )}
          </Box>
        ))}

        <Box textAlign="center">
          {errorMessage && (
            <Typography
              variant="subtitle2"
              sx={{ color: "red", marginBottom: "1rem", textAlign: "center" }}
            >
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={styles.submitButton}
            disabled={isSubmitted}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={handleNewTest}
            sx={styles.newTestButton}
            disabled={false} // Keep this button always enabled
          >
            New Test
          </Button>
        </Box>
        {isSubmitted && (
          <Typography variant="h6" sx={{ marginTop: "1rem", textAlign: "center" }}>
            Total Correct Answers: {calculateTotalCorrect()} out of {questions.length}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default MCQTest;