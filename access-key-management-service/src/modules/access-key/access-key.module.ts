import { Module } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessKey, AccessKeySchema } from 'src/schemas/access-key.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AccessKey.name,
        schema: AccessKeySchema,
      },
    ]),
  ],
  providers: [AccessKeyService],
  exports: [AccessKeyService],
})
export class AccessKeyModule {}
