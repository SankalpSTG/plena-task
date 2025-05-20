import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { AccessKey } from 'src/schemas/access-key.schema';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from './dto';

@Injectable()
export class AccessKeyService {
  constructor(@InjectModel(AccessKey.name) private keyModel: Model<AccessKey>) {}

  async createKey(dto: CreateAccessKeyDto): Promise<AccessKey> {
    const key = uuidv4();
    const expiresAt = new Date(Date.now() + dto.expiresInSeconds * 1000);

    const newKey = new this.keyModel({
      key,
      rateLimit: dto.rateLimit,
      expiresAt,
      enabled: true,
    });

    return newKey.save();
  }

  async getAllKeys(): Promise<AccessKey[]> {
    return this.keyModel.find().exec();
  }

  async getAccessKeyDetails(accessKey: string): Promise<AccessKey> {
    const key = await this.keyModel.findOne({key: accessKey});
    if (!key) throw new NotFoundException('Key not found');
    return key;
  }

  async updateKey(id: string, dto: UpdateAccessKeyDto): Promise<AccessKey> {
    const updatePayload: Partial<AccessKey> = {};
    if (dto.rateLimit) updatePayload.rateLimit = dto.rateLimit
    if (dto.expiresInSeconds) updatePayload.expiresAt = new Date(Date.now() + dto.expiresInSeconds * 1000)
    const updated = await this.keyModel.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Key not found');
    return updated;
  }

  async deleteKey(id: string): Promise<AccessKey> {
    const result = await this.keyModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Key not found');
    return result
  }

  async updateAccessKeyStatus(id: string, enabled: boolean): Promise<AccessKey> {
    const updated = await this.keyModel.findOneAndUpdate({key: id}, { enabled: enabled }, { new: true });
    if (!updated) throw new NotFoundException('Key not found');
    return updated;
  }
}
