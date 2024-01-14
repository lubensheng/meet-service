import { User } from '../entities/user.entity';

export class LoginUserVo {
  userInfo: User;
  accessToken: string;
  refreshToken: string;
  // 测试jenkins拉取代码
}
