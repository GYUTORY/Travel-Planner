import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Place } from './entities/place.entity';
import { SearchPlacesDto } from './dto/search-places.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async search(dto: SearchPlacesDto): Promise<Place[]> {
    const qb = this.placeRepository.createQueryBuilder('place');
    if (dto.name) {
      qb.andWhere('place.name LIKE :name', { name: `%${dto.name}%` });
    }
    if (dto.lat && dto.lng && dto.radius) {
      // 간단한 거리 계산 (Haversine 공식은 아니고, 근사치)
      qb.andWhere('ABS(place.lat - :lat) < :latDelta', { lat: dto.lat, latDelta: dto.radius / 111320 });
      qb.andWhere('ABS(place.lng - :lng) < :lngDelta', { lng: dto.lng, lngDelta: dto.radius / 88000 });
    }
    return qb.getMany();
  }

  async findOne(id: string): Promise<Place> {
    const place = await this.placeRepository.findOne({ where: { id } });
    if (!place) throw new NotFoundException('Place not found');
    return place;
  }
} 