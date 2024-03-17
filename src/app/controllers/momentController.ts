import { Request, Response, Router } from "express";
import momentRepository from "../repositories/momentRepository";
import uploadFile from "../../shared/middleware/uploadFile";

const momentRouter = Router();

momentRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
    const moments = await momentRepository.getMoments();
    return res.status(200).json(moments);
})

momentRouter.get('/:id', async (_req: Request, res: Response): Promise<Response> => {
    const moment = await momentRepository.getMomentById(Number(_req.params.id));
    if (!moment) {
        return res.status(404).json({ message: 'Moment not found' });
    }
    return res.status(200).json(moment);
})


momentRouter.post('/', uploadFile.single('image'), async (req: Request, res: Response): Promise<Response> => {
    const moments = await momentRepository.createMoment({
        ...req.body,
        image: req?.file?.path
    });
    
    if (!moments) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    return res.status(201).json(moments);
})

momentRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
    const moments = await momentRepository.updateMoment(Number(req.params.id), req.body);
    if (!moments) {
        return res.status(404).json({ message: 'Moment not found' });
    }
    return res.status(200).json(moments);
})

export default momentRouter;