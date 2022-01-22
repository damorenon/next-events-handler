import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        // if newsletter database does not exist, then it's automatically created
        const client = await MongoClient.connect(
            "mongodb+srv://damorenon:nqttbduy@cluster0.zmbzy.mongodb.net/events?retryWrites=true&w=majority"
        );
        const db = client.db();
        await db.collection("newsletter").insertOne({ email: userEmail });
        client.close();

        console.log(userEmail);
        res.status(200).json({ message: "Signed up!" });
    }
}

export default handler;
