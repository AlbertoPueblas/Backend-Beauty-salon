import { Request, Response } from "express"
import { Treatsment } from "../models/Treatsment";

//----------------------------------------------

export const treatsmentController = {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { treatsment, price } = req.body;

            if (!treatsment) {
                res.status(400).json({
                    message: "Invalid data"
                });
                return;
            }
            const newTreatsment = Treatsment.create({
                treatsment: treatsment,
                price: price,
            });

            await Treatsment.save(newTreatsment)
            res.status(201).json({
                message: "Treatsment created"
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to create treatsment",
                error: (error as any)
            })
        }
    },

    async getAllTreatsment(req: Request, res: Response): Promise<void> {
        try {
            //Pagination
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 250;

            const [treatsment, totalTreatsment] = await Treatsment.findAndCount({
                select: {
                    id: true,
                    treatsment: true,
                    price: true,
                },
                skip: (page - 1) * limit,
                take: limit
            });

            if (treatsment.length === 0) {
                res.status(404).json({
                    message: "No treatsment found"
                });
                return;
            }
            const totalPages = Math.ceil(totalTreatsment / limit);

            res.status(200).json({
                treatsment: treatsment.slice((page - 1) * limit, page * limit),
                current_page: page,
                total_pages: totalPages,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
            })
        }
    },

    async getTreatsmentById(req: Request, res: Response): Promise<void> {
        try {
            const treatsmentId = Number(req.params.id);

            const treatsment = await Treatsment.findOne({
                select: {
                    id: true,
                    treatsment: true,
                    price: true,
                },
                where: { id: treatsmentId }
            });

            if (!treatsment) {
                res.status(404).json({
                    message: "Treatsment not found"
                });
                return;
            }
            res.status(200).json({
                treatsment: treatsment
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve job",
                error: (error as any).message
            });
        }
    },

    async updateTreatsment(req: Request, res: Response): Promise<void> {
        try {
            const treatsment = req.tokenData.id;
            const { ...resTreatsmentData } = req.body;

            const treatsmentToUpdate = await Treatsment.findOne({ where: { id: treatsment } });

            if (!treatsmentToUpdate) {
                res.status(404).json({
                    message: "Treatsment not found"
                });
                return;
            }
            const updateTreatsment: Partial<Treatsment> = {
                ...resTreatsmentData,
            }

            await Treatsment.save(updateTreatsment);

            res.status(200).json({
                message: "Treatsment updated"
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to update treatsment",
                error: (error as any).message
            })
        }
    },

    async deleteTreatsment(req: Request, res: Response): Promise<void> {
        try {
            const treatsmentId = Number(req.params.id);

            const deleteTreatsment = await Treatsment.delete(treatsmentId);
            if (!deleteTreatsment) {
                res.status(404).json({
                    message: "Treatsment not found"
                });
                return;
            }
            res.status(200).json({
                message: "Treatsment deleted"
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete treatsment",
            })
        }
    },
};