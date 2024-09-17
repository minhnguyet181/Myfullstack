import { Injectable,NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async createUser(userData: CreateUserDto): Promise<User> {
    
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException(`Người dùng với ID ${id} không tồn tại`);
    }

    Object.assign(existingUser, userData);

    return await this.usersRepository.save(existingUser);
  }
 


}