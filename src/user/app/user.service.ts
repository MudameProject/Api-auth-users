import { Injectable } from '@nestjs/common';
import { User } from '../../commons/domain/entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(user: User): User {
    // Logic to create a new user
    return user;
  }

  getUserById(id: string): User {
    // Logic to get a user by ID
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: string, updatedUser: User): User {
    // Logic to update a user
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updatedUser,
      } as User;
      return this.users[userIndex];
    }
    return null;
  }

  deleteUser(id: string): boolean {
    // Logic to delete a user
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
