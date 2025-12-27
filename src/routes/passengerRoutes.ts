/**
 * @swagger
 * tags:
 *   - name: Passengers
 *     description: Gestão de passageiros
 */

import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  getProfile,
  updateProfile,
  getAllPassengers,
  getPassengerById,
  deletePassenger
} from '../controllers/passengerController';

const router = Router();

/**
 * @swagger
 * /passengers/profile:
 *   get:
 *     summary: Obter perfil do passageiro autenticado
 *     tags: [Passengers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do passageiro
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
 * /passengers/profile:
 *   put:
 *     summary: Atualizar perfil do passageiro
 *     tags: [Passengers]
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
 *           example:
 *             name: Maria Silva
 *             phone: "+244 923 456 789"
 *             avatarUrl: https://example.com/avatar.jpg
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
 * /passengers:
 *   get:
 *     summary: Listar todos os passageiros
 *     tags: [Passengers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de passageiros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authenticate, getAllPassengers);

/**
 * @swagger
 * /passengers/{id}:
 *   get:
 *     summary: Obter passageiro por ID
 *     tags: [Passengers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do passageiro
 *     responses:
 *       200:
 *         description: Detalhes do passageiro
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
 *       404:
 *         description: Passageiro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authenticate, getPassengerById);

/**
 * @swagger
 * /passengers/{id}:
 *   delete:
 *     summary: Deletar passageiro
 *     tags: [Passengers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do passageiro
 *     responses:
 *       200:
 *         description: Passageiro deletado com sucesso
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Passageiro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, deletePassenger);

export default router;
