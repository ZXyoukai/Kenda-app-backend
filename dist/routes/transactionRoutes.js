"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const transactionController_1 = require("../controllers/transactionController");
const router = (0, express_1.Router)();
// All routes require authentication
router.post('/', authMiddleware_1.authenticate, transactionController_1.createTransaction);
router.get('/', authMiddleware_1.authenticate, transactionController_1.getTransactions);
router.get('/:id', authMiddleware_1.authenticate, transactionController_1.getTransactionById);
router.get('/ride/:rideId', authMiddleware_1.authenticate, transactionController_1.getTransactionByRideId);
router.get('/user/:userId/total', authMiddleware_1.authenticate, transactionController_1.getUserTransactionTotal);
router.delete('/:id', authMiddleware_1.authenticate, transactionController_1.deleteTransaction);
exports.default = router;
