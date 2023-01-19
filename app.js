import 'dotenv/config';
import express from 'express';
import { MongoClient, ObjectId } from "mongodb";
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = new MongoClient(process.env.uri);
const profile_collection = client.db("Teams_summarizer")
    .collection("User_profiles");

////////////////////////////////////////////////////  ALL PATHS ////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/signup', async (req, res) => {
    let user = req.body;

    profile_collection.find({ email: req.body.email }).toArray(function (err, docs) {
        if (docs.length > 0) {
            return res.json({ result: "Email already exists" })
        }
        else {
            profile_collection
                .insertOne(user)
            return res.json({ result: true })
        }
    });
});

app.post('/login', async (req, res) => {
    let user = req.body;
    profile_collection
        .findOne({ email: user.email, password: user.password }, function (err, result) {
            if (err) return { status: false };
            if (result != null) {
                return res.json({ result: result })
            } else {
                return res.json({ result: "Invalid email or password" })
            }
        });
});

app.post('/profile', async (req, res) => {
    profile_collection
        .findOne({ _id: ObjectId(req.body.id) }, function (err, result) {
            if (err) return res.json({ result: false });
            return res.json({ result: result })
        });
});

app.listen(process.env.PORT || 3000, () => { console.log("running...") })