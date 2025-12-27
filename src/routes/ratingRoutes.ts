/**
 * @swagger
 * tags:
 *   - name: Ratings
 *     description: Gestão de avaliações
 */

import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createRating,
  getRatingById,
  getRatingByRideId,
  getUserRatings,
  getUserAverageRating
} from '../controllers/ratingController';

const router = Router();

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Criar uma nova avaliação
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rideId
 *               - rating
 *             properties:
 *               rideId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *           example:
 *             rideId: "123e4567-e89b-12d3-a456-426614174000"
 *             rating: 5
 *             comment: Excelente motorista, muito educado!
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
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
router.post('/', authenticate, createRating);

/**
 * @swagger
 * /ratings/{id}:
 *   get:
 *     summary: Obter avaliação por ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Detalhes da avaliação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authenticate, getRatingById);

/**
 * @swagger
 * /ratings/ride/{rideId}:
 *   get:
 *     summary: Obter avaliação de uma viagem
 *     tags: [Ratings]
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
 *         description: Avaliação da viagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/ride/:rideId', authenticate, getRatingByRideId);

/**
 * @swagger
 * /ratings/user/{userId}:
 *   get:
 *     summary: Obter todas as avaliações de um usuário
 *     tags: [Ratings]
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
 *         description: Lista de avaliações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/user/:userId', authenticate, getUserRatings);

/**
 * @swagger
 * /ratings/user/{userId}/average:
 *   get:
 *     summary: Obter média de avaliações de um usuário
 *     tags: [Ratings]
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
 *         description: Média de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                 totalRatings:
 *                   type: number
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/user/:userId/average', authenticate, getUserAverageRating);

export default router;
