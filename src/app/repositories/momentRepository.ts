import { AppDataSource } from "../../database/data-source";
import Moment from "../entities/Moment";
import { MomentDto } from "../interfaces/dto/MomentDto";

const momentRepository = AppDataSource.getRepository(Moment);

const getMoments = (): Promise<Moment[]> => momentRepository.find();

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

export default { getMoments, getMomentById, createMoment, updateMoment };