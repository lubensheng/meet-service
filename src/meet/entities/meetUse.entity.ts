import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Meet } from './meet.entity';

@Entity({
  name: 'meet_use',
})
export class MeetUse {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'datetime',
  })
  startTime: Date;

  @Column({
    type: 'datetime',
  })
  endTime: Date;

  @Column({
    type: 'int',
  })
  useUserId: number;

  @Column({
    length: 50,
    comment: '使用这个会议室的用户名字',
  })
  useUserName: string;

  @JoinColumn()
  @OneToOne(() => Meet)
  meetId: string;
}
