"use strict";
/**
 * @swagger
 * tags:
 *   - name: Rides
 *     description: Gestão de viagens (pessoas e cargas)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rideControllerV2_1 = require("../controllers/rideControllerV2");
const router = (0, express_1.Router)();
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
router.post('/calculate-price', rideControllerV2_1.calculatePrice);
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
router.post('/', authMiddleware_1.authenticate, rideControllerV2_1.createRide);
router.get('/', authMiddleware_1.authenticate, rideControllerV2_1.getRides);
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
router.get('/pending', authMiddleware_1.authenticate, rideControllerV2_1.getPendingRides);
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
router.get('/:id', authMiddleware_1.authenticate, rideControllerV2_1.getRideById);
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
router.post('/:id/accept', authMiddleware_1.authenticate, rideControllerV2_1.acceptRide);
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
router.post('/:id/start', authMiddleware_1.authenticate, rideControllerV2_1.startRide);
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
router.post('/:id/complete', authMiddleware_1.authenticate, rideControllerV2_1.completeRide);
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
router.post('/:id/cancel', authMiddleware_1.authenticate, rideControllerV2_1.cancelRide);
router.put('/:id', authMiddleware_1.authenticate, rideControllerV2_1.updateRide);
router.delete('/:id', authMiddleware_1.authenticate, rideControllerV2_1.deleteRide);
exports.default = router;
