const Thread = require("../models/thread");
const User = require("../models/user");
const sequelize = require('../util/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getThread = async (req, res, next) => {
    console.log('THread', req.body);
    const { user, receiverList} = req.body;
    try {
        // const threads = await Thread.findAll({
        //     where: { userId: user },
        //     order: [
        //         ['createdAt', 'DESC']
        //     ] 
        // })
        const threads = await Thread.findAll({
            include: {
                model: User,
                where: {
                    isLoggedIn: {
                        [Op.eq]: true,
                    },
                },
            },
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
    const { sender, receiverList, message } = req.body;
    let trans;
    let chats = []
    try {
        trans = await sequelize.transaction();
        receiverList.forEach(async (receiver) => {
            await Thread.create({
                sender, receiver, message, userId: sender
            })
        });
        res.status(201).json({ 'message': 'success' });
        await trans.commit();
    } catch (err) {
        res.status(203).json({ 'message': 'failed' });
        console.log(err);
        if (trans) await trans.rollback();
    };
}

module.exports = {
    sendMsg,
    getThread,  
};
