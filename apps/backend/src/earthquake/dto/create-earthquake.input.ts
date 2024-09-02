import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateEarthquakeInput {
  @Field()
  dateTime: Date;

  @Field({ nullable: true })
  latitude: number;

  @Field({ nullable: true })
  longitude: number;

  @Field(() => Float, { nullable: true })
  depth?: number;

  @Field(() => Float)
  magnitude: number;

  @Field({ nullable: true })
  magType?: string;

  @Field(() => Int, { nullable: true })
  nbStations?: number;

  @Field(() => Float, { nullable: true })
  gap?: number;

  @Field(() => Float, { nullable: true })
  distance?: number;

  @Field(() => Float, { nullable: true })
  rms?: number;

  @Field({ nullable: true })
  source?: string;

  @Field({ nullable: true })
  eventID?: string;

  @Field()
  location: string;

  @Field({ nullable: true })
  timeOfDayMagnitude?: string;

  @Field({ nullable: true })
  depthRangeCount?: string;

  @Field({ nullable: true })
  earthquakeSourceCount?: string;
}
