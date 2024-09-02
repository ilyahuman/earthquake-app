import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateEarthquakeInput } from './create-earthquake.input';

@InputType()
export class UpdateEarthquakeInput extends PartialType(CreateEarthquakeInput) {
  @Field(() => Int)
  id!: number;
}
