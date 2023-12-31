import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PRIVACY } from 'src/enum/enum';
import { User } from 'src/user/user.schema';
import { Category, SubCategory } from './category.schema';
import { UserIdentity } from 'src/user-identity/user-identity.schema';

export type PublishServiceDocument = HydratedDocument<PublishService>;

@Schema({ versionKey: false })
export class PublishService {

    @Prop({ type: Types.ObjectId, ref: User.name }) 
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: UserIdentity.name }) 
    userIdentityId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Category.name }) 
    servicesId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: SubCategory.name }) 
    subServicesId: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop({ type: Array<String>})
    filesName: string[];

    @Prop({ type: Object, default: { lat: null, lng: null } })
    coordinates: { lat: number | null; lng: number | null };

    @Prop({ default: PRIVACY.EVERYONE, enum:PRIVACY})
    privacyPublishService: PRIVACY;

    @Prop({default: new Date()})
    createdPublishServiceDate: Date

    @Prop()
    addressLocation: string;
}

export const PublishServiceSchema = SchemaFactory.createForClass(PublishService);
