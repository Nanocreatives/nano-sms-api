import { BadRequestException, Injectable } from '@nestjs/common';
import { SendMessageDto } from './sendMessage.dto';

@Injectable()
export class MessageService {
  async sendMessage(
    request: SendMessageDto,
    token: string,
  ): Promise<{
    resultat: string;
    statut: string;
    id: string;
  }> {
    const url = 'https://sms.mtncongo.net/api/sms/';
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `${token}`);
    const body = JSON.stringify({
      ...request,
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body,
    };
    try {
      const response = await fetch(url, requestOptions);
      if (response.status === 201) {
        return response.json() as unknown as {
          resultat: string;
          statut: string;
          id: string;
        };
      }
      throw new BadRequestException(response.json());
    } catch (error) {
      console.error('***', error);
      throw error;
    }
  }
}
