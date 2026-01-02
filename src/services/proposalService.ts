import { prisma } from '../config/database';
import { getIO } from '../socket';

interface CreateProposalData {
  rideId: string;
  driverId: string;
  proposedPrice: number;
  estimatedDuration?: number;
  message?: string;
}

export class ProposalService {
  async createProposal(data: CreateProposalData) {
    // Verificar se a viagem existe e é do tipo CARGO
    const ride = await prisma.ride.findUnique({
      where: { id: data.rideId },
      include: { passenger: true },
    });

    if (!ride) {
      throw new Error('Ride not found');
    }

    if (ride.type !== 'CARGO') {
      throw new Error('Proposals are only available for cargo rides');
    }

    if (ride.status !== 'PENDING') {
      throw new Error('Ride is not available for proposals');
    }

    // Verificar se motorista já fez proposta para esta viagem
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        rideId: data.rideId,
        driverId: data.driverId,
        status: { in: ['PENDING', 'ACCEPTED'] },
      },
    });

    if (existingProposal) {
      throw new Error('You already have a proposal for this ride');
    }

    // Criar proposta
    const proposal = await prisma.proposal.create({
      data: {
        rideId: data.rideId,
        driverId: data.driverId,
        proposedPrice: data.proposedPrice,
        estimatedDuration: data.estimatedDuration,
        message: data.message,
        status: 'PENDING',
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
            vehicleModel: true,
            vehiclePlate: true,
            vehicleColor: true,
            averageRating: true,
            totalRides: true,
          },
        },
        ride: {
          select: {
            id: true,
            type: true,
            originAddress: true,
            destAddress: true,
            estimatedPrice: true,
          },
        },
      },
    });

    // Emitir evento WebSocket para o passageiro
    try {
      const io = getIO();
      io.to(ride.passengerId).emit('newProposal', {
        proposal,
        rideId: data.rideId,
      });
      console.log(`Notified passenger ${ride.passengerId} about new proposal`);
    } catch (error) {
      console.error('Error emitting socket event:', error);
    }

    return proposal;
  }

  async getProposalsByRide(rideId: string) {
    const proposals = await prisma.proposal.findMany({
      where: { rideId },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
            vehicleModel: true,
            vehiclePlate: true,
            vehicleColor: true,
            averageRating: true,
            totalRides: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return proposals;
  }

  async getProposalsByDriver(driverId: string) {
    const proposals = await prisma.proposal.findMany({
      where: { driverId },
      include: {
        ride: {
          select: {
            id: true,
            type: true,
            status: true,
            originAddress: true,
            destAddress: true,
            originLat: true,
            originLng: true,
            destLat: true,
            destLng: true,
            estimatedPrice: true,
            distanceKm: true,
            durationMin: true,
            cargoDescription: true,
            cargoWeight: true,
            createdAt: true,
            passenger: {
              select: {
                id: true,
                name: true,
                phone: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return proposals;
  }

  async acceptProposal(proposalId: string, userId: string) {
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        ride: {
          include: {
            passenger: true,
          },
        },
        driver: true,
      },
    });

    if (!proposal) {
      throw new Error('Proposal not found');
    }

    // Verificar se o usuário é o passageiro da viagem
    if (proposal.ride.passengerId !== userId) {
      throw new Error('Unauthorized: You are not the passenger of this ride');
    }

    if (proposal.status !== 'PENDING') {
      throw new Error('Proposal is not pending');
    }

    if (proposal.ride.status !== 'PENDING') {
      throw new Error('Ride is no longer available');
    }

    // Aceitar proposta e atualizar viagem
    const [updatedProposal, updatedRide] = await prisma.$transaction([
      // Atualizar proposta para ACCEPTED
      prisma.proposal.update({
        where: { id: proposalId },
        data: { status: 'ACCEPTED' },
      }),
      // Atualizar viagem com motorista e preço da proposta
      prisma.ride.update({
        where: { id: proposal.rideId },
        data: {
          driverId: proposal.driverId,
          estimatedPrice: proposal.proposedPrice,
          status: 'ACCEPTED',
        },
      }),
      // Rejeitar todas outras propostas desta viagem
      prisma.proposal.updateMany({
        where: {
          rideId: proposal.rideId,
          id: { not: proposalId },
          status: 'PENDING',
        },
        data: { status: 'REJECTED' },
      }),
    ]);

    // Emitir evento WebSocket para o motorista
    try {
      const io = getIO();
      io.to(proposal.driverId).emit('proposalAccepted', {
        proposalId,
        ride: updatedRide,
      });
      console.log(`Notified driver ${proposal.driverId} about accepted proposal`);
    } catch (error) {
      console.error('Error emitting socket event:', error);
    }

    return {
      proposal: updatedProposal,
      ride: updatedRide,
    };
  }

  async rejectProposal(proposalId: string) {
    const proposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: { status: 'REJECTED' },
    });

    return proposal;
  }

  async getProposalById(proposalId: string) {
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
            vehicleModel: true,
            vehiclePlate: true,
            vehicleColor: true,
            averageRating: true,
            totalRides: true,
          },
        },
        ride: true,
      },
    });

    return proposal;
  }
}
