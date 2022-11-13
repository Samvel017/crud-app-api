import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsNotEmpty()
  public email: string;
}

export default User;
