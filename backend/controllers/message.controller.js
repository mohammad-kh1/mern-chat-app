import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // there is no existing conversation, so create a new one
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });

    }
}