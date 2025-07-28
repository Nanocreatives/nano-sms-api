import { Controller, Post, Body, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './sendMessage.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Sms provider')
@Controller('sms-provider')
export class MessageController {
  constructor(private readonly appService: MessageService) {}

  @Post()
  sendMessage(@Body() sendMessageDto: SendMessageDto, @Req() request: Request) {
    return this.appService.sendMessage(
      sendMessageDto,
      request.headers['authorization'],
    );
  }
}
