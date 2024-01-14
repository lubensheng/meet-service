import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Role from './role.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 20,
    comment: '密码',
  })
  password: string;

  @Column({
    length: 50,
    comment: '昵称',
    default: null,
  })
  nickName: string;

  @Column({
    length: 50,
    comment: '邮箱',
  })
  email: string;

  @Column({
    length: 100,
    comment: '头像',
    default: null,
  })
  headPic: string;

  @Column({
    length: 30,
    comment: '电话',
    default: null,
  })
  phoneNumber: string;

  @Column({
    comment: '是否被冻结',
    default: false,
  })
  isFrozen: boolean;

  @Column({
    comment: '是否是管理员',
    default: false,
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @JoinTable({
    name: 'user_roles',
  })
  @ManyToMany(() => Role, {})
  roles: Role[];
}
