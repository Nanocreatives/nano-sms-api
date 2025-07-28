import { BadRequestException, Injectable } from '@nestjs/common';
import { SendMessageDto } from './sendMessage.dto';
import * as https from 'https';

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
    const data = JSON.stringify({ ...request });

    const options = {
      hostname: 'sms.mtncongo.net',
      port: 443,
      path: '/api/sms/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      rejectUnauthorized: false,
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseBody = '';

        res.on('data', (chunk) => {
          responseBody += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 201) {
            try {
              const parsedData = JSON.parse(responseBody);
              resolve(parsedData);
            } catch (e) {
              reject(new BadRequestException('Erreur de parsing JSON'));
            }
          } else {
            reject(
              new BadRequestException(
                `Échec requête: ${res.statusCode} - ${responseBody}`,
              ),
            );
          }
        });
      });

      req.on('error', (error) => {
        console.error('Requête HTTPS échouée', error);
        reject(error);
      });

      req.write(data);
      req.end();
    });
  }
}
