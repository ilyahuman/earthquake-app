import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EarthquakeService } from './earthquake.service';
import { Earthquake } from '../entities/earthquake.entity';
import { CreateEarthquakeInput } from './dto/create-earthquake.input';
import { UpdateEarthquakeInput } from './dto/update-earthquake.input';

@Resolver(() => Earthquake)
export class EarthquakeResolver {
  constructor(private readonly earthquakeService: EarthquakeService) {}

  @Query(() => Earthquake)
  async getEarthquake(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Earthquake> {
    return this.earthquakeService.findOne(id);
  }

  @Query(() => [Earthquake])
  async getEarthquakes(): Promise<Earthquake[]> {
    return this.earthquakeService.getAllEarthquakes();
  }

  @Mutation(() => Earthquake)
  async createEarthquake(
    @Args('input') input: CreateEarthquakeInput,
  ): Promise<Earthquake> {
    if (typeof input.magnitude === 'string') {
      input.magnitude = parseInt(input.magnitude, 10);
    }
    return this.earthquakeService.createEarthquake(input);
  }

  @Mutation(() => Earthquake)
  async updateEarthquake(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateEarthquakeInput,
  ): Promise<Earthquake> {
    if (typeof input.latitude === 'string') {
      input.latitude = parseFloat(input.latitude);
    }
    if (typeof input.magnitude === 'string') {
      input.magnitude = parseFloat(input.magnitude);
    }
    return this.earthquakeService.updateEarthquake(id, input);
  }

  @Mutation(() => Boolean)
  async deleteEarthquake(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.earthquakeService.deleteEarthquake(id);
  }
}
