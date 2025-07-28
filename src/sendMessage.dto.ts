import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
export class SendMessageDto {
    @IsNotEmpty()
    @ApiProperty()
    msg:string;
    @IsNotEmpty()
    @ApiProperty()
    receivers:string;
    @IsNotEmpty()
    @ApiProperty()
    sender: string;
}