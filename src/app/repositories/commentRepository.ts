import { AppDataSource } from "../../database/data-source";
import Comment from "../entities/Comment";
import { CommentDto } from "../interfaces/dto/CommentDto";

const commentRepository = AppDataSource.getRepository(Comment);

const getComments = (): Promise<Comment[]> => commentRepository.find();

const createComment = async (momentData: CommentDto): Promise<Comment | null> => {
    if (!momentData.text || !momentData.username || !momentData.momentId) {
        return null;
    }
    const newComment = commentRepository.create({
        ...momentData,
        moment: { id: momentData.momentId }
    });
    return await commentRepository.save(newComment);
};

export default { getComments, createComment };