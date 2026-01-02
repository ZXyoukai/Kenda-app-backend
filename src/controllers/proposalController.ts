import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { ProposalService } from '../services/proposalService';

const proposalService = new ProposalService();

// Driver cria proposta para uma viagem de carga
export const createProposal = async (req: AuthRequest, res: Response) => {
  try {
    const driverId = req.user?.id;
    const { rideId, proposedPrice, estimatedDuration, message } = req.body;

    if (!driverId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const proposal = await proposalService.createProposal({
      rideId,
      driverId,
      proposedPrice,
      estimatedDuration,
      message,
    });

    res.status(201).json(proposal);
  } catch (error: any) {
    console.error('Error creating proposal:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Listar propostas de uma viagem (para passageiro)
export const getProposalsByRide = async (req: AuthRequest, res: Response) => {
  try {
    const { rideId } = req.params;
    const proposals = await proposalService.getProposalsByRide(rideId);
    res.json(proposals);
  } catch (error: any) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Listar propostas feitas por um motorista
export const getProposalsByDriver = async (req: AuthRequest, res: Response) => {
  try {
    const driverId = req.user?.id;
    
    if (!driverId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const proposals = await proposalService.getProposalsByDriver(driverId);
    res.json(proposals);
  } catch (error: any) {
    console.error('Error fetching driver proposals:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Passageiro aceita proposta
export const acceptProposal = async (req: AuthRequest, res: Response) => {
  try {
    const { proposalId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const result = await proposalService.acceptProposal(proposalId, userId);
    res.json(result);
  } catch (error: any) {
    console.error('Error accepting proposal:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Motorista ou passageiro rejeita/cancela proposta
export const rejectProposal = async (req: AuthRequest, res: Response) => {
  try {
    const { proposalId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const result = await proposalService.rejectProposal(proposalId);
    res.json(result);
  } catch (error: any) {
    console.error('Error rejecting proposal:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
