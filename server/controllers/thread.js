const Thread = require("../models/thread");

const getThread = async (req, res, next) => {
    console.log('THread', req.body);
    const { user, receiver} = req.body;
    try {
        const threads = await Thread.findAll({
            where: { userId: user, receiver },
            order: [
                ['createdAt', 'DESC']
            ] 
        })
        res.status(203).json({ 'threads': threads });
    } catch (err) {
        console.log(err);
    };
}

const sendMsg = async (req, res, next) => {
    console.log('THread', req.body);
    const { sender, receiver, message } = req.body;
    try {
        const thread = await Thread.create({
            sender, receiver, message, userId: sender
        })
        res.status(203).json({ 'thread': thread });
    } catch (err) {
        console.log(err);
    };
}

module.exports = {
    sendMsg,
    getThread,  
};
