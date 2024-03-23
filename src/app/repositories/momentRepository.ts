import { FindManyOptions, Like } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import Moment from "../entities/Moment";
import { MomentDto } from "../interfaces/dto/MomentDto";

const momentRepository = AppDataSource.getRepository(Moment);

const getMoments = async (page: number, perPage: number, searchTerm: string): Promise<[Moment[], number]> => {
    const options: FindManyOptions<Moment> = {
        take: perPage,
        skip: (page - 1) * perPage,
        where: {},
        order: {
            createdAt: 'DESC',
        },
    };

    if (searchTerm) {
        options.where = {
            title: Like(`%${searchTerm}%`),
        };
    }

    const [moments, count] = await momentRepository.findAndCount(options);
    return [moments, count];
};

const getMomentById = (id: number): Promise<Moment | null> => momentRepository.findOneBy({ id });

const createMoment = async (momentData: MomentDto): Promise<Moment | null> => {
    if (!momentData.title || !momentData.description || !momentData.image) {
        return null;
    }
    
    const newMoment = momentRepository.create(momentData);
    return await momentRepository.save(newMoment);
};

const updateMoment = async (id: number, momentData: MomentDto): Promise<Moment | null> => {
    const moment = await momentRepository.findOneBy({ id });
    if (!moment) {
        return null;
    }

    moment.title = momentData.title || moment.title;
    moment.description = momentData.description || moment.description;
    moment.image = momentData.image || moment.image;

    return await momentRepository.save(moment);
}

const deleteMoment = async (id: number): Promise<boolean> => {
    const moment = await momentRepository.findOneBy({ id });
    if (!moment) {
        return false;
    }

    await momentRepository.delete(id);
    return true;
}

export default { getMoments, getMomentById, createMoment, updateMoment, deleteMoment };