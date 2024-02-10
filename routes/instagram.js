import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiEndpoint = `https://graph.instagram.com/v12.0/${process.env.USER_ID}?fields=id,username,media{id,media_type,media_url,thumbnail_url,permalink}&access_token=${process.env.ACCESS_TOKEN}`;
    const apiResponse = await axios.get(apiEndpoint);
    // Return the response from the external API
    res.json(apiResponse.data.media.data);
  } catch (error) {
    console.error('Error fetching Instagram data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
