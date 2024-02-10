import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiEndpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.PLACE_ID}&fields=reviews&key=${process.env.PLACES_KEY}`
    const apiResponse = await axios.get(apiEndpoint);
    // Return the response from the external API
    res.json(apiResponse.data.result.reviews);
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
