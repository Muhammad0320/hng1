import axios from "axios";
import express, { Request, response, Response } from "express";

const app = express();

const port = 3000 || 8000;

app.get("/api/hello/visitor_name?", async (req: Request, res: Response) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const { visitor_name } = req.params;

    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { city } = response.data;

    const data = {
      ip,
      location: city,

      greetings: `Hello, ${visitor_name}!, the temperature is 11 degree Celcius in ${city} `,
    };

    res.status(200).send(data);
  } catch (error) {
    console.error("Error fetching location:", error);
    res.send("Error fetching location");
  }
});

app.listen(port, () => {
  console.log("Listening to app on port: " + port);
});
