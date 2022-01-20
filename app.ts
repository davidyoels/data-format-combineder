require("dotenv").config();

import express, { Request, Response } from "express";
import path from "path";

const app = express();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "develpoment";

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/combine-jsons");
});

app.post("/combine-files", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).redirect("/combine-jsons");
});

app.get("/combine-jsons", (req: Request, res: Response) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
