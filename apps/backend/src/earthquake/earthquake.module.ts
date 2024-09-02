import { Module } from '@nestjs/common';
import { EarthquakeService } from './earthquake.service';
import { EarthquakeResolver } from './earthquake.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Earthquake } from '../entities/earthquake.entity';
import { SqliteDriver } from '@mikro-orm/sqlite';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: 'earthquakes-db.sqlite',
      autoLoadEntities: true,
      driver: SqliteDriver,
    }),
    MikroOrmModule.forFeature([Earthquake]),
  ],
  providers: [EarthquakeService, EarthquakeResolver],
})
export class EarthquakeModule {}
