import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Earthquake } from '../entities/earthquake.entity';
import { CreateEarthquakeInput } from './dto/create-earthquake.input';
import { UpdateEarthquakeInput } from './dto/update-earthquake.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EarthquakeService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: number): Promise<Earthquake | null> {
    return await this.em.findOne(Earthquake, { id });
  }

  async getAllEarthquakes(): Promise<Earthquake[]> {
    return this.em.find(Earthquake, {}, { orderBy: { dateTime: 'DESC' } });
  }

  async createEarthquake(input: CreateEarthquakeInput): Promise<Earthquake> {
    const eventID = uuidv4();
    const earthquake = this.em.create(Earthquake, { ...input, eventID });
    if (typeof input.magnitude === 'string') {
      input.magnitude = parseFloat(input.magnitude);
    }
    await this.em.persistAndFlush(earthquake);
    return earthquake;
  }

  async updateEarthquake(
    id: number,
    input: UpdateEarthquakeInput,
  ): Promise<Earthquake> {
    const earthquake = await this.em.findOneOrFail(Earthquake, id);
    if (typeof input.magnitude === 'string') {
      input.magnitude = parseFloat(input.magnitude);
    }
    this.em.assign(earthquake, input);
    await this.em.persistAndFlush(earthquake);
    return earthquake;
  }

  async deleteEarthquake(id: number): Promise<boolean> {
    const earthquake = await this.em.findOneOrFail(Earthquake, id);
    await this.em.removeAndFlush(earthquake);
    return true;
  }
}
