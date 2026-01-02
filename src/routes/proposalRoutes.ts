import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createProposal,
  getProposalsByRide,
  getProposalsByDriver,
  acceptProposal,
  rejectProposal,
} from '../controllers/proposalController';

const router = Router();

// Todas rotas requerem autenticação
router.use(authMiddleware);

// Driver cria proposta para viagem de carga
router.post('/', createProposal);

// Listar propostas de uma viagem (passageiro)
router.get('/ride/:rideId', getProposalsByRide);

// Listar propostas do motorista logado
router.get('/my-proposals', getProposalsByDriver);

// Aceitar proposta (passageiro)
router.patch('/:proposalId/accept', acceptProposal);

// Rejeitar proposta
router.patch('/:proposalId/reject', rejectProposal);

export default router;
