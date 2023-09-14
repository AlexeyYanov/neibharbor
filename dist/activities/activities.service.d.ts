/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { FilesService } from '../files/files.service';
import { Model } from 'mongoose';
import { Activities } from './activities.schema';
import { ActivitiesDto } from './activities.dto';
export declare class ActivitiesService {
    private readonly activitiesModel;
    private filesService;
    constructor(activitiesModel: Model<Activities>, filesService: FilesService);
    createActivitie({ activitie, files, }: {
        activitie: ActivitiesDto;
        files: Array<Express.Multer.File>;
    }): Promise<ActivitiesDto>;
    getAllActivities(): Promise<(import("mongoose").Document<unknown, {}, Activities> & Activities & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
