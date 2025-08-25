import mongoose from "mongoose";
import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";

export const sendMessage = async (req, res) => {
    try {
        console.log(req.body);
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: "Invalid receiver ID" });
        }
        
        let conversationId;

        let currentConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
        
        if (!currentConversation) {
            currentConversation = await Conversation.create({ participants: [senderId, receiverId] });
        }
        
        conversationId = currentConversation._id;
                    const newMessage = new Message({
                sender: senderId,
                receiver: receiverId,
                message,
                conversationId: currentConversation._id
            });

        if (newMessage) {
            await newMessage.save();
            currentConversation.messages.push(newMessage._id);
            await currentConversation.save();
            res.status(201).json({ 
                success: true,
                message: "Message sent successfully",
                data: newMessage 
            });
        } else {
            res.status(400).json({ 
                success: false,
                message: "Failed to create message" 
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const senderId = req.user._id;
        console.log('hihihih', senderId,id);
        // const conversation = await Conversation.findOne(
        //     { participants: { $all: [senderId] } }
        // ).populate("messages");
        const conversation = await Conversation.findById(id).populate("messages");
        console.log('conversation', conversation);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        const messages = conversation.messages;
        
        // Transform the messages to match the desired format
        const transformedMessages = messages.map(msg => ({
            _id: msg._id,
            sender: msg.sender,
            receiver: msg.receiver,
            message: msg.message,
            conversationId: msg.conversationId,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt,
            __v: msg.__v
        }));
        
        res.status(200).json({ messages: transformedMessages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


