export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface DistanceResult {
  distanceKm: number;
  durationMin: number;
}

export class LocationProvider {
  /**
   * Calcula a distância entre dois pontos usando a fórmula de Haversine
   * Retorna a distância em quilômetros
   */
  static calculateDistance(origin: LocationCoordinates, destination: LocationCoordinates): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(destination.lat - origin.lat);
    const dLng = this.toRad(destination.lng - origin.lng);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(origin.lat)) * Math.cos(this.toRad(destination.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return parseFloat(distance.toFixed(2));
  }

  /**
   * Estima a duração da viagem baseado na distância
   * Assume velocidade média de 30 km/h em áreas urbanas
   */
  static estimateDuration(distanceKm: number, averageSpeedKmh: number = 30): number {
    const durationHours = distanceKm / averageSpeedKmh;
    const durationMin = durationHours * 60;
    return parseFloat(durationMin.toFixed(2));
  }

  /**
   * Calcula distância e duração estimada entre dois pontos
   */
  static getDistanceAndDuration(
    origin: LocationCoordinates, 
    destination: LocationCoordinates
  ): DistanceResult {
    const distanceKm = this.calculateDistance(origin, destination);
    const durationMin = this.estimateDuration(distanceKm);
    
    return { distanceKm, durationMin };
  }

  /**
   * Verifica se um ponto está dentro de um raio específico de outro ponto
   */
  static isWithinRadius(
    center: LocationCoordinates, 
    point: LocationCoordinates, 
    radiusKm: number
  ): boolean {
    const distance = this.calculateDistance(center, point);
    return distance <= radiusKm;
  }

  private static toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

/**
 * TODO: Integrar com Google Maps API ou OpenStreetMap para:
 * - Rotas otimizadas
 * - Tráfego em tempo real
 * - Duração precisa
 * - Geocoding (endereço <-> coordenadas)
 */
