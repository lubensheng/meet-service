import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Query,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUser } from './dto/register-user.dto';
import LoginUser from './dto/login-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import Message from 'src/utils/messgae';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('用户操作')
@Controller('user')
export class UserController {
  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户注册', description: '用户注册' })
  @ApiBody({
    type: RegisterUser,
  })
  @Post('register')
  async register(@Body() registerUser: RegisterUser) {
    return this.userService.register(registerUser);
  }

  @ApiBody({
    type: LoginUser,
  })
  @Post('login')
  async login(@Body() user: LoginUser) {
    return this.userService.login(user);
  }

  @ApiQuery({
    name: 'register-captcha',
    description: '发送邮件',
    type: 'string',
  })
  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    const message = new Message();
    await this.redisService.set(`captcha_${address}`, 5 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`,
    });
    message.setCode(HttpStatus.OK);
    message.setIsSuccess(true);
    message.setMessage('发送成功');
    return message;
  }

  @ApiQuery({
    name: 'updateUserInfo',
    description: '修改用户信息(只支持修改密码)',
  })
  @Post('updateUserInfo')
  async updateUserInfo(@Body() userInfo: UpdateUserDto) {
    return this.userService.updateUserInfo(userInfo);
  }

  @ApiQuery({
    name: 'getUserList',
    description: '获取用户列表',
  })
  @Post('getUserList')
  async getUserList() {
    return this.userService.getUserList();
  }

  @ApiQuery({
    name: 'getUserInfoById',
    description: '通过id去获取当前用户信息',
  })
  @Get('getUserInfoById/:userId')
  async getUserInfoById(@Param('userId') userId: number) {
    return this.userService.getUserInfoById(userId);
  }

  @ApiQuery({
    name: 'getUserInfoByUsername',
    description: '通过用户名称去获取当前用户信息',
  })
  @Get('getUserInfoByUsername/:username')
  async getUserInfoByUsername(@Param('username') username: string) {
    return this.userService.getUserInfoByUsername(username);
  }

  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }
}
