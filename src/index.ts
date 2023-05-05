import { Redis } from "ioredis";
import express from "express";
import cors from "cors"

const client = new Redis("redis://default:655d0d20b9b1449683b4c37d59cd35ae@loyal-sloth-32673.upstash.io:32673")

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
});

app.get("/", (req, res) => {
  res.send("<h6>Group 3 backend</h6>")
})


app.get( "/courses", async ( req, res ) => {
    const courses = await client.get("courses") ?? "[]"
    res.json(JSON.parse(courses));
})


app.post('/courses', async (req, res) => {
    const courses = req.body
    console.log("POST")
    console.log(courses)
    await client.set("courses", JSON.stringify(courses))
})

app.listen( PORT, () => {
    console.log( `server started at http://localhost:${ PORT }` );
})