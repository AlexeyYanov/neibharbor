import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
@Controller('mailing')
export class MailController {

    constructor(private readonly mailService: MailService) {}

    @Get('send')
    async send(){
        console.log('mailing/send');
        
        // await this.mailService.sendMail()
    } 
}