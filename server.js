import express from "express";
import service from "./Main/open-service.js";

const app = express();
app.use(express.json())   

const port = process.env.PORT || 3000;

app.post('/completion', (req, res) => {
  service(req.body.pass, req.body.prompt, res);
})

app.listen(port, () => {
  console.log(`Dennis content generation app is running in port ${port}`)
})