import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUser } from './dto/register-user.dto';
import { RedisService } from 'src/redis/redis.service';
import LoginUser from './dto/login-user.dto';
import Message from 'src/utils/messgae';
import Role from './entities/role.entity';
import Permission from './entities/permission.entity';
import { LoginUserVo } from './vo/login.vo';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  async register(user: RegisterUser) {
    // 获取验证码
    const captcha = await this.redisService.get(`captcha_${user.email}`);
    console.log(captcha);
    if (!captcha) {
      throw new HttpException('验证码失效', HttpStatus.BAD_REQUEST);
    }
    if (captcha !== user.captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const curUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (curUser) {
      throw new HttpException('当前用户已经存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.nickName = user.nickName;
    const message = new Message();
    try {
      this.userRepository.save(newUser);
      message.setCode(HttpStatus.OK);
      message.setIsSuccess(true);
      message.setMessage('注册成功');
      return message;
    } catch (e) {
      this.logger.error(e, UserService);
      message.setCode(HttpStatus.BAD_REQUEST);
      message.setIsSuccess(false);
      message.setMessage(e.message);
      return message;
    }
  }

  async login(user: LoginUser) {
    const curUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
      relations: ['roles', 'roles.permissions'],
    });
    if (!curUser) {
      throw new HttpException(
        '当前用户不存在，请先注册',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (curUser.password !== user.password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    const message = new Message<LoginUserVo>();
    const loginUserVo = new LoginUserVo();
    loginUserVo.userInfo = curUser;
    loginUserVo.accessToken = this.jwtService.sign(
      {
        userId: curUser.id,
        username: curUser.username,
      },
      {
        expiresIn: '30m',
      },
    );
    message.setCode(HttpStatus.OK);
    message.setIsSuccess(true);
    message.setMessage('登陆成功');
    message.setData(loginUserVo);
    return loginUserVo;
  }

  async getUserInfoById(id: number) {
    const userInfo = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['roles', 'roles.permissions'],
    });

    return userInfo;
  }

  async updateUserInfo(userInfo: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        password: userInfo.password,
        username: userInfo.username,
      },
    });

    if (!user) {
      return '用户不存在或者密码错误';
    }

    await this.userRepository.update(
      { id: user.id },
      {
        password: userInfo.newPassword,
      },
    );

    return '修改成功';
  }

  async getUserInfoByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return '用户不存在';
    }
    return user;
  }

  async getUserList() {
    const users = await this.userRepository.find();
    return users;
  }

  async initData() {
    const user1 = new User();
    user1.username = 'zhangsan';
    user1.password = '111111';
    user1.email = 'xxx@xx.com';
    user1.isAdmin = true;
    user1.nickName = '张三';
    user1.phoneNumber = '13233323333';

    const user2 = new User();
    user2.username = 'lisi';
    user2.password = '222222';
    user2.email = 'yy@yy.com';
    user2.nickName = '李四';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1, role2];
    user2.roles = [role2];

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission2];
    console.log(permission1);
    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
  }
}
