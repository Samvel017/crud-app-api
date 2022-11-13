import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      if (!createUserDto.email || !createUserDto.name) {
        throw new Error('Email and Name fields are required!');
      }
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  getUsers() {
    return this.userRepository.find();
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAndUpdateUser(createUserDto: CreateUserDto, id: number) {
    await this.userRepository.update(id, createUserDto);
    const user = this.findUsersById(id);
    return user;
  }

  async deleteUserById(id: number) {
    const user = this.findUsersById(id);
    await this.userRepository.delete(id);
    return user;
  }
}
