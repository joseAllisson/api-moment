import { Request, Response, Router } from "express";
import commentRepository from "../repositories/commentRepository";

const commentRouter = Router();

commentRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
    const comment = await commentRepository.getComments();
    return res.status(200).json({ data: comment});
})

commentRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
    const comment = await commentRepository.createComment(req.body);
    if (!comment) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    return res.status(201).json(comment);
})

export default commentRouter;