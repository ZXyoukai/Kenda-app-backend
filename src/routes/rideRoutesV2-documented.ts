/**
 * @swagger
 * tags:
 *   - name: Rides
 *     description: Gestão de viagens (pessoas e cargas)
 */

import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createRide,
  getRides,
  getRideById,
  getPendingRides,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
  calculatePrice,
  updateRide,
  deleteRide
} from '../controllers/rideControllerV2';

const router = Router();

/**
 * @swagger
 * /rides/calculate-price:
 *   post:
 *     summary: Calcular preço estimado da viagem
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - distanceKm
 *               - durationMin
 *               - type
 *             properties:
 *               distanceKm:
 *                 type: number
 *               durationMin:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [PERSON, CARGO]
 *           example:
 *             distanceKm: 10.5
 *             durationMin: 25
 *             type: PERSON
 *     responses:
 *       200:
 *         description: Preço calculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estimatedPrice:
 *                   type: number
 */
router.post('/calculate-price', calculatePrice);

/**
 * @swagger
 * /rides:
 *   post:
 *     summary: Criar nova viagem
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - originLat
 *               - originLng
 *               - originAddress
 *               - destLat
 *               - destLng
 *               - destAddress
 *               - estimatedPrice
 *               - paymentMethod
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [PERSON, CARGO]
 *               originLat:
 *                 type: number
 *               originLng:
 *                 type: number
 *               originAddress:
 *                 type: string
 *               destLat:
 *                 type: number
 *               destLng:
 *                 type: number
 *               destAddress:
 *                 type: string
 *               estimatedPrice:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [CASH, MULTICAIXA_EXPRESS]
 *               cargoDescription:
 *                 type: string
 *               cargoWeight:
 *                 type: number
 *               cargoDimensions:
 *                 type: string
 *           example:
 *             type: PERSON
 *             originLat: -8.8383
 *             originLng: 13.2344
 *             originAddress: Talatona, Luanda
 *             destLat: -8.8150
 *             destLng: 13.2302
 *             destAddress: Marginal de Luanda
 *             estimatedPrice: 1500
 *             paymentMethod: CASH
 *     responses:
 *       201:
 *         description: Viagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *   get:
 *     summary: Listar viagens
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: passengerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: driverId
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Lista de viagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ride'
 */
router.post('/', authenticate, createRide);
router.get('/', authenticate, getRides);

/**
 * @swagger
 * /rides/pending:
 *   get:
 *     summary: Listar viagens pendentes
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de viagens pendentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ride'
 */
router.get('/pending', authenticate, getPendingRides);

/**
 * @swagger
 * /rides/{id}:
 *   get:
 *     summary: Obter viagem por ID
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da viagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       404:
 *         description: Viagem não encontrada
 */
router.get('/:id', authenticate, getRideById);

/**
 * @swagger
 * /rides/{id}/accept:
 *   post:
 *     summary: Aceitar viagem (motorista)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Viagem aceita com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 */
router.post('/:id/accept', authenticate, acceptRide);

/**
 * @swagger
 * /rides/{id}/start:
 *   post:
 *     summary: Iniciar viagem
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Viagem iniciada com sucesso
 */
router.post('/:id/start', authenticate, startRide);

/**
 * @swagger
 * /rides/{id}/complete:
 *   post:
 *     summary: Completar viagem
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - finalPrice
 *               - distanceKm
 *               - durationMin
 *               - paymentMethod
 *             properties:
 *               finalPrice:
 *                 type: number
 *               distanceKm:
 *                 type: number
 *               durationMin:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [CASH, MULTICAIXA_EXPRESS]
 *     responses:
 *       200:
 *         description: Viagem completada com sucesso
 */
router.post('/:id/complete', authenticate, completeRide);

/**
 * @swagger
 * /rides/{id}/cancel:
 *   post:
 *     summary: Cancelar viagem
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Viagem cancelada com sucesso
 */
router.post('/:id/cancel', authenticate, cancelRide);

router.put('/:id', authenticate, updateRide);
router.delete('/:id', authenticate, deleteRide);

export default router;
