import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  getUserStats,
  getDriverStats,
  getSystemStats
} from '../controllers/statsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Statistics
 *     description: Estatísticas e métricas do sistema
 */

/**
 * @swagger
 * /stats/user:
 *   get:
 *     summary: Obter estatísticas do usuário autenticado
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRides:
 *                   type: number
 *                 totalSpent:
 *                   type: number
 *                 averageRating:
 *                   type: number
 *                 totalRatings:
 *                   type: number
 *       401:
 *         description: Não autorizado
 */
router.get('/user', authenticate, getUserStats);

/**
 * @swagger
 * /stats/driver/{driverId}:
 *   get:
 *     summary: Obter estatísticas de um motorista específico
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do motorista
 *     responses:
 *       200:
 *         description: Estatísticas do motorista
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRides:
 *                   type: number
 *                 totalEarnings:
 *                   type: number
 *                 averageRating:
 *                   type: number
 *                 totalRatings:
 *                   type: number
 *                 vehicleInfo:
 *                   type: object
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Motorista não encontrado
 */
router.get('/driver/:driverId', authenticate, getDriverStats);

/**
 * @swagger
 * /stats/system:
 *   get:
 *     summary: Obter estatísticas gerais do sistema (Admin apenas)
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas do sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalDrivers:
 *                   type: number
 *                 totalPassengers:
 *                   type: number
 *                 totalRides:
 *                   type: number
 *                 totalTransactions:
 *                   type: number
 *                 onlineDrivers:
 *                   type: number
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado - Admin apenas
 */
router.get('/system', authenticate, getSystemStats);

export default router;
