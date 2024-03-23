import { Request, Response, Router } from "express";
import momentRepository from "../repositories/momentRepository";
import uploadFile from "../../shared/middleware/uploadFile";

const momentRouter = Router();

momentRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const perPage = req.query.perPage ? Number(req.query.perPage) : 20;
        const searchTerm = req.query.searchTerm ? String(req.query.searchTerm) : '';
    
        const [moments, total] = await momentRepository.getMoments(page, perPage, searchTerm);
        return res.status(200).json({
            data: moments,
            meta: {
              page,
              perPage,
              total,
              totalPages: Math.ceil(total / perPage),
            },
        });
    } catch (error) {
        return res.status(400).json({ message: 'invalid parameters', error });
    }
})

momentRouter.get('/:id', async (_req: Request, res: Response): Promise<Response> => {
    const moment = await momentRepository.getMomentById(Number(_req.params.id));
    if (!moment) {
        return res.status(404).json({ message: 'Moment not found' });
    }
    return res.status(200).json({ data: moment });
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

momentRouter.put('/:id', uploadFile.single('image'), async (req: Request, res: Response): Promise<Response> => {
    const moments = await momentRepository.updateMoment(Number(req.params.id), {
        ...req.body,
        image: req?.file?.path
    });
    
    if (!moments) {
        return res.status(404).json({ message: 'Moment not found' });
    }
    return res.status(200).json(moments);
})

momentRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const moments = await momentRepository.deleteMoment(Number(req.params.id));
    if (!moments) {
        return res.status(404).json({ message: 'Moment not found' });
    }
    return res.status(200).json(moments);
})

export default momentRouter;