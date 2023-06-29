import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  async findAll() {
    return await this.userRepository.findAndCount();
  }

  async create(category: Partial<User>) {
    return await this.userRepository.save(category);
  }
}
