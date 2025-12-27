"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.getUserTransactionTotal = exports.getTransactionByRideId = exports.getTransactionById = exports.getTransactions = exports.createTransaction = void 0;
const transactionService_1 = require("../services/transactionService");
const transactionService = new transactionService_1.TransactionService();
const createTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to create transaction' });
    }
};
exports.createTransaction = createTransaction;
const getTransactions = async (req, res) => {
    try {
        const { userId, rideId, type, paymentMethod, startDate, endDate } = req.query;
        const filter = {};
        if (userId)
            filter.userId = userId;
        if (rideId)
            filter.rideId = rideId;
        if (type)
            filter.type = type;
        if (paymentMethod)
            filter.paymentMethod = paymentMethod;
        if (startDate)
            filter.startDate = new Date(startDate);
        if (endDate)
            filter.endDate = new Date(endDate);
        const transactions = await transactionService.getTransactions(filter);
        res.json(transactions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTransactions = getTransactions;
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await transactionService.getTransactionById(id);
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }
        res.json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTransactionById = getTransactionById;
const getTransactionByRideId = async (req, res) => {
    try {
        const { rideId } = req.params;
        const transaction = await transactionService.getTransactionByRideId(rideId);
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }
        res.json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTransactionByRideId = getTransactionByRideId;
const getUserTransactionTotal = async (req, res) => {
    try {
        const { userId } = req.params;
        const { type } = req.query;
        const total = await transactionService.getUserTransactionTotal(userId, type);
        res.json({ total });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserTransactionTotal = getUserTransactionTotal;
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        await transactionService.deleteTransaction(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to delete transaction' });
    }
};
exports.deleteTransaction = deleteTransaction;
