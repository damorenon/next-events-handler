// /api/comments/some-id
import { MongoClient } from "mongodb";

async function handler(req, res) {
    const eventId = req.query.eventId;

    const client = await MongoClient.connect(
        "mongodb+srv://damorenon:nqttbduy@cluster0.zmbzy.mongodb.net/events?retryWrites=true&w=majority"
    );

    if (req.method === "POST") {
        const { email, name, text } = req.body;

        if (
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !text ||
            text.trim() === ""
        ) {
            res.status(422).json({ message: "invalid input" });
            return;
        }

        const newComment = { eventId, email, name, text };

        const db = client.db();
        const result = await db.collection("comments").insertOne(newComment);

        console.log(result);

        res.status(201).json({
            message: "Added comments.",
            comment: newComment
        });
    }

    if (req.method === "GET") {
        const dummyList = [
            { id: "c1", name: "Max", text: "A 1st comment" },
            { id: "c2", name: "Manuel", text: "A 2nd comment" }
        ];
        res.status(201).json({ comments: dummyList });
    }

    client.close();
}

export default handler;
