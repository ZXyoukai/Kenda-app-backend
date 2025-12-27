import { RatingRepository } from '../repositories/RatingRepository';
import { CreateRatingDTO, RatingResponseDTO } from '../dtos/rating.dto';

export class RatingService {
  private ratingRepository: RatingRepository;

  constructor() {
    this.ratingRepository = new RatingRepository();
  }

  async createRating(data: CreateRatingDTO): Promise<RatingResponseDTO> {
    if (data.stars < 1 || data.stars > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const existingRating = await this.ratingRepository.findByRideId(data.rideId);
    if (existingRating) {
      throw new Error('Rating already exists for this ride');
    }

    const rating = await this.ratingRepository.create({
      ride: { connect: { id: data.rideId } },
      rater: { connect: { id: data.raterId } },
      ratedUser: { connect: { id: data.ratedUserId } },
      stars: data.stars,
      comment: data.comment,
    });

    return this.mapToResponseDTO(rating);
  }

  async getRatingById(id: string): Promise<RatingResponseDTO | null> {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) {
      return null;
    }
    return this.mapToResponseDTO(rating);
  }

  async getRatingByRideId(rideId: string): Promise<RatingResponseDTO | null> {
    const rating = await this.ratingRepository.findByRideId(rideId);
    if (!rating) {
      return null;
    }
    return this.mapToResponseDTO(rating);
  }

  async getUserRatings(userId: string): Promise<RatingResponseDTO[]> {
    const ratings = await this.ratingRepository.findByUserId(userId);
    return ratings.map(rating => this.mapToResponseDTO(rating));
  }

  async getUserAverageRating(userId: string): Promise<number> {
    return await this.ratingRepository.getAverageRating(userId);
  }

  private mapToResponseDTO(rating: any): RatingResponseDTO {
    return {
      id: rating.id,
      rideId: rating.rideId,
      raterId: rating.raterId,
      ratedUserId: rating.ratedUserId,
      stars: rating.stars,
      comment: rating.comment,
      createdAt: rating.createdAt,
    };
  }
}
