import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUser {
  @ApiProperty({ name: 'username', description: '用户名', required: true })
  @IsNotEmpty({
    message: '用户名称不能为空',
  })
  username: string;

  @ApiProperty({ name: 'password', description: '密码', required: true })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码最长不能少于6位',
  })
  password: string;

  @ApiProperty({ name: 'nickName', description: '昵称', required: true })
  @IsNotEmpty({
    message: '昵称不能为空',
  })
  @MaxLength(50, {
    message: '昵称最长不能超过50',
  })
  nickName: string;

  @ApiProperty({ name: 'email', description: '邮箱', required: true })
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  email: string;

  @ApiProperty({ name: 'captcha', description: '验证码', required: true })
  @IsNotEmpty({ message: '验证码不能为空' })
  captcha: string;
}
