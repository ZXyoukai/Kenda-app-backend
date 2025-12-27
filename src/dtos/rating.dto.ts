export interface CreateRatingDTO {
  rideId: string;
  raterId: string;
  ratedUserId: string;
  stars: number;
  comment?: string;
}

export interface RatingResponseDTO {
  id: string;
  rideId: string;
  raterId: string;
  ratedUserId: string;
  stars: number;
  comment: string | null;
  createdAt: Date;
}
