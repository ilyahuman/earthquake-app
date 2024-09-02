import { NestFactory } from '@nestjs/core';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from '../app.module';
import { Earthquake } from '../entities/earthquake.entity';
import * as csv from 'csv-parser';
import * as fs from 'fs';

async function populateDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const orm = app.get(MikroORM);
  const em = orm.em.fork();
  const schemaGenerator = orm.getSchemaGenerator();

  await schemaGenerator.updateSchema();

  const csvFilePath = './src/db/earthquakes.csv';

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      const earthquake = new Earthquake();
      earthquake.dateTime = new Date(row['DateTime']);
      earthquake.latitude = parseFloat(row['Latitude']);
      earthquake.longitude = parseFloat(row['Longitude']);
      earthquake.depth = parseFloat(row['Depth']);
      earthquake.magnitude = parseFloat(row['Magnitude']);
      earthquake.magType = row['MagType'];
      earthquake.nbStations = row['NbStations']
        ? parseInt(row['NbStations'])
        : undefined;
      earthquake.gap = row['Gap'] ? parseFloat(row['Gap']) : undefined;
      earthquake.distance = row['Distance']
        ? parseFloat(row['Distance'])
        : undefined;
      earthquake.rms = row['RMS'] ? parseFloat(row['RMS']) : undefined;
      earthquake.source = row['Source'];
      earthquake.eventID = row['EventID'];
      earthquake.location = row['Location'];
      earthquake.depthRangeCount = row['DepthRangeCount'];
      earthquake.earthquakeSourceCount = row['EarthquakeSourceCount'];
      earthquake.timeOfDayMagnitude = row['TimeOfDayMagnitude'];

      em.persist(earthquake);
    })
    .on('end', async () => {
      await em.flush();
      await app.close();
      console.log('Database populated successfully!');
    });
}

populateDatabase().catch((err) => {
  console.error('Failed to populate database:', err);
});
