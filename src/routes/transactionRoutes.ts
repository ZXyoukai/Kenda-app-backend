/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: Gestão de transações financeiras
 */

import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  getTransactionByRideId,
  getUserTransactionTotal,
  deleteTransaction
} from '../controllers/transactionController';

const router = Router();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Criar uma nova transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - amount
 *               - type
 *               - paymentMethod
 *             properties:
 *               userId:
 *                 type: string
 *               rideId:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [RIDE_PAYMENT, REFUND]
 *               paymentMethod:
 *                 type: string
 *                 enum: [CASH, MULTICAIXA_EXPRESS]
 *               description:
 *                 type: string
 *           example:
 *             userId: "123e4567-e89b-12d3-a456-426614174000"
 *             rideId: "123e4567-e89b-12d3-a456-426614174001"
 *             amount: 1500
 *             type: RIDE_PAYMENT
 *             paymentMethod: MULTICAIXA_EXPRESS
 *             description: Pagamento de viagem
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticate, createTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Listar todas as transações
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authenticate, getTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Obter transação por ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação
 *     responses:
 *       200:
 *         description: Detalhes da transação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Transação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authenticate, getTransactionById);

/**
 * @swagger
 * /transactions/ride/{rideId}:
 *   get:
 *     summary: Obter transação de uma viagem
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da viagem
 *     responses:
 *       200:
 *         description: Transação da viagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Transação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/ride/:rideId', authenticate, getTransactionByRideId);

/**
 * @swagger
 * /transactions/user/{userId}/total:
 *   get:
 *     summary: Obter total de transações de um usuário
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Total de transações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 count:
 *                   type: number
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/user/:userId/total', authenticate, getUserTransactionTotal);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Deletar transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação
 *     responses:
 *       200:
 *         description: Transação deletada com sucesso
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Transação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, deleteTransaction);

export default router;
