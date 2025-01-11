import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Rating,
  Paper,
} from "@mui/material";
import api_url from "../endpoint"

export default function Reviews() {
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(api_url + "/getReviews");
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      stars > 0 &&
      description.trim() &&
      fullName.trim() &&
      country.trim() &&
      city.trim()
    ) {
      const newReview = {
        stars,
        description,
        full_name: fullName,
        country,
        city,
      };

      try {
        const response = await axios.post(api_url + "/reviews", newReview);
        setReviews(response.data.reviews);
        setStars(0);
        setDescription("");
        setFullName("");
        setCountry("");
        setCity("");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      alert("Please provide star ratings and all required fields.");
    }
  };

  return (
    <Container sx={{ padding: "20px", maxWidth: "350px", display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '1.5rem' }}>
        Leave a Review
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Box mb={1} display="flex" justifyContent="center">
          <Rating
            value={stars}
            onChange={(event, newValue) => {
              setStars(newValue);
            }}
            precision={1}
          />
        </Box>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin="normal"
          required
          size="small" // Make the TextField smaller
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          margin="normal"
          required
          size="small" // Make the TextField smaller
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          margin="normal"
          required
          size="small" // Make the TextField smaller
        />
        <TextField
          label="Write your review here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2} // Reduced rows for a smaller text area
          fullWidth
          margin="normal"
          required
          size="small" // Make the TextField smaller
        />
        <Button type="submit" variant="contained" color="primary" >
          Submit Review
        </Button>
      </Box>
      <Typography variant="h5" align="center" gutterBottom mt={4}>
        Reviews
      </Typography>
      <Box sx={{ width: '100%' }}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">
                <strong>{review.full_name}</strong> from {review.city}, {review.country} on {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
              <Rating value={review.stars} readOnly />
              <Typography variant="body1">{review.description}</Typography>
            </Paper>
          ))
        ) : (
          <Typography>No reviews yet.</Typography>
        )}
      </Box>
    </Container>
  );
}
