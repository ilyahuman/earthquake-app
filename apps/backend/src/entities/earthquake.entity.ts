import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Earthquake {
  @Field(() => Int)
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field()
  @Property()
  dateTime!: Date;

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  depth?: number;

  @Field(() => Float)
  @Property()
  magnitude!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  magType?: string;

  @Field(() => Int, { nullable: true })
  @Property({ nullable: true })
  nbStations?: number;

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  gap?: number;

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  distance?: number;

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  rms?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  source?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  eventID?: string;

  @Field()
  @Property()
  location!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  timeOfDayMagnitude?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  depthRangeCount?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  earthquakeSourceCount?: string;
}
