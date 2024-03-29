import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render("index.ejs")
  console.log(req.body.name)
})

app.post("/submitForm", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single&contains="+req.body.name);
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      errorMessage: "There is no joke containing that word, try something else",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
