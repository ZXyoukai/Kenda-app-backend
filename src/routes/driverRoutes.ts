/**
 * @swagger
 * tags:
 *   - name: Drivers
 *     description: Gestão de motoristas
 */

import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  getProfile,
  updateProfile,
  getAllDrivers,
  getOnlineDrivers,
  getDriverById,
  updateLocation,
  setOnlineStatus,
  deleteDriver
} from '../controllers/driverController';

const router = Router();

/**
 * @swagger
 * /drivers/profile:
 *   get:
 *     summary: Obter perfil do motorista autenticado
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do motorista
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/profile', authenticate, getProfile);

/**
 * @swagger
 * /drivers/profile:
 *   put:
 *     summary: Atualizar perfil do motorista
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *               vehicleModel:
 *                 type: string
 *               vehiclePlate:
 *                 type: string
 *           example:
 *             name: João Motorista
 *             phone: "+244 923 456 789"
 *             vehicleModel: Toyota Corolla
 *             vehiclePlate: LD-12-34-AB
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
router.put('/profile', authenticate, updateProfile);

/**
 * @swagger
 * /drivers/location:
 *   put:
 *     summary: Atualizar localização do motorista
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentLat
 *               - currentLng
 *             properties:
 *               currentLat:
 *                 type: number
 *                 format: double
 *               currentLng:
 *                 type: number
 *                 format: double
 *           example:
 *             currentLat: -8.8383
 *             currentLng: 13.2344
 *     responses:
 *       200:
 *         description: Localização atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
router.put('/location', authenticate, updateLocation);

/**
 * @swagger
 * /drivers/status:
 *   put:
 *     summary: Alterar status online/offline do motorista
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isOnline
 *             properties:
 *               isOnline:
 *                 type: boolean
 *           example:
 *             isOnline: true
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
router.put('/status', authenticate, setOnlineStatus);

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Listar todos os motoristas
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: Lista de motoristas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getAllDrivers);

/**
 * @swagger
 * /drivers/online:
 *   get:
 *     summary: Listar motoristas online
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: Lista de motoristas online
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/online', getOnlineDrivers);

/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Obter motorista por ID
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do motorista
 *     responses:
 *       200:
 *         description: Detalhes do motorista
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Motorista não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getDriverById);

/**
 * @swagger
 * /drivers/{id}:
 *   delete:
 *     summary: Deletar motorista
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do motorista
 *     responses:
 *       200:
 *         description: Motorista deletado com sucesso
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Motorista não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, deleteDriver);

export default router;
