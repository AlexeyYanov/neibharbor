import { Injectable } from '@nestjs/common';
import { AddNewMessageDto, ChatIDDto, NewChatDto, ParticipantDto } from './messenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chats } from './chats.schema';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Message, MessageSchema } from './message.schema';
import { User } from 'src/user/user.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';
import { MessageType } from '../types'
import { IDUserDto } from 'src/user/user.dto';
@Injectable()
export class MessengerService {

    constructor(
        @InjectModel(UserIdentity.name) private userIdentityModel: Model<UserIdentity>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Chats.name) private chatsModel: Model<Chats>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
        private userService: UserService
    ) { }

    async openChat(dto: NewChatDto)
        : Promise<{
            participants: {
                userId: string,
                avatarFileName: string,
                fullName: string,
            }[],
            chatId: string | Types.ObjectId
        }> {
        try {

            const userIds = dto.participants.map(item => item.userId)

            const existingChat = await this.chatsModel.findOne({
                'participants.userId': { $all: userIds },
            });

            if (existingChat) {
                return {
                    participants: existingChat.participants,
                    chatId: existingChat._id,
                };
            }

            const newChat = await this.chatsModel.create({ participants: dto.participants });

            return {
                participants: newChat.participants,
                chatId: newChat._id,
            };
        } catch (error) {
            throw new Error('SERVER ERROR openChat')
        }
    }
    async listChat(dto: IDUserDto) {
        try {
            const userId = dto._id;

            const chats = await this.chatsModel.find({
                participants: { $elemMatch: { userId: userId } },
            });

            const chatsWithLastMessage = await Promise.all(
                chats.map(async (item) => {
                    const message = await this.messageModel.findOne({ chatId: item._id }).sort({ timestamp: -1 });
                    return {participants : item.toObject().participants, chatId: item._id ,lastMessage: message ? message.toObject() : null };
                })
            );

            return chatsWithLastMessage;
        } catch (error) {
            throw new Error('SERVER ERROR');
        }
    }


    async getChatHistory(dto: ChatIDDto) {
        try {

            const chatId = new Types.ObjectId(dto.chatId)
            const history = await this.messageModel.find({ chatId })
            return history || []
        } catch (error) {
            throw new Error('SERVER ERROR')
        }
    }

    async addMessage(payload: AddNewMessageDto): Promise<void> {
        try {
            const chatId = new Types.ObjectId(payload.chatId)
            const senderId = new Types.ObjectId(payload.senderId)
            await this.messageModel.create({ ...payload, chatId, senderId })
        } catch (error) {
            throw new Error('SERVER ERROR')
        }
    }
}
