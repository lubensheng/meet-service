import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'permission',
})
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 10,
    comment: '权限code',
  })
  code: string;

  @Column({
    length: 50,
    comment: '权限描述',
  })
  description: string;
}
