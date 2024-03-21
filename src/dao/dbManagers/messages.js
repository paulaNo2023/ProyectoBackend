import messagesModel from "../models/messages.js";

export default class Messages {
    createMessage = async message => {
        let result = await messagesModel.create(message);
        return result;
    }
}