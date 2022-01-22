// /api/comments/some-id

function handler(req, res) {
    const eventId = req.query.eventId;

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

        const newComment = { id: new Date().toISOString(), email, name, text };
        console.log(newComment);

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
}

export default handler;
