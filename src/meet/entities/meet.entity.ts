import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'meet-list',
})
export class Meet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 40,
    comment: '会议室名称',
  })
  meetName: string;

  @CreateDateColumn()
  createTime: Date;

  @CreateDateColumn()
  updateTime: Date;

  @Column({
    comment: '会议室大小',
  })
  size: number;

  @Column({
    comment: '是否被使用',
    type: 'boolean',
    default: false,
  })
  isUse: boolean;

  @Column({
    comment: '使用开始时间',
    type: 'datetime',
    nullable: true,
  })
  startTime: Date;

  @Column({
    comment: '使用结束时间',
    type: 'datetime',
    nullable: true,
  })
  endTime: Date;
}
