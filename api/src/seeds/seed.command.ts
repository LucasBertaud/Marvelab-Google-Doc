import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedsService } from './seeds.service';

async function runSeeds() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedsService = app.get(SeedsService);

  try {
    await seedsService.run();
    console.log('🎉 Seeds exécutés avec succès !');
  } catch (error) {
    console.error("❌ Erreur lors de l'exécution des seeds:", error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

runSeeds();
