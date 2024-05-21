import { Request, Response } from "express"
import { Treatment } from "../models/Treatment";

//----------------------------------------------

export const treatmentController = {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { treatment, price } = req.body;

            if (!treatment) {
                res.status(400).json({
                    message: "Invalid data"
                });
                return;
            }
            const newTreatment = Treatment.create({
                treatment: treatment,
                price: price,
            });

            await Treatment.save(newTreatment)
            res.status(201).json({
                message: "Treatment created"
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to create treatment",
                error: (error as any)
            })
        }
    },

    async getAllTreatment(req: Request, res: Response): Promise<void> {
        try {
            //Pagination
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const [treatment, totalTreatment] = await Treatment.findAndCount({
                select: {
                    id: true,
                    treatment: true,
                    price: true,
                },
                skip: (page - 1) * limit,
                take: limit
            });
            
            if (treatment.length === 0) {
                res.status(404).json({
                    message: "No treatment found"
                });
                return;
            }
            const totalPages = Math.ceil(totalTreatment / limit);

            res.status(200).json({
                treatment: treatment,
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
            })
        }
    },

    async getTreatmentById(req: Request, res: Response): Promise<void> {
        try {
            const treatmentId = Number(req.params.id);

            const treatment = await Treatment.findOne({
                select: {
                    id: true,
                    treatment: true,
                    price: true,
                },
                where: { id: treatmentId }
            });

            if (!treatment) {
                res.status(404).json({
                    message: "Treatment not found"
                });
                return;
            }
            res.status(200).json({
                treatment: treatment
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve job",
                error: (error as any).message
            });
        }
    },

    async updateTreatment(req: Request, res: Response): Promise<void> {
        try {
            const treatment = req.tokenData.id;
            const { ...resTreatmentData } = req.body;

            const treatmentToUpdate = await Treatment.findOne({ where: { id: treatment } });

            if (!treatmentToUpdate) {
                res.status(404).json({
                    message: "Treatment not found"
                });
                return;
            }
            const updateTreatment: Partial<Treatment> = {
                ...resTreatmentData,
            }

            await Treatment.save(updateTreatment);

            res.status(200).json({
                message: "Treasment updated"
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to update treatment",
                error: (error as any).message
            })
        }
    },

    async deleteTreatment(req: Request, res: Response): Promise<void> {
        try {
            const treatmentId = Number(req.params.id);

            const deleteTreatment = await Treatment.delete(treatmentId);
            if (!deleteTreatment) {
                res.status(404).json({
                    message: "Treatment not found"
                });
                return;
            }
            res.status(200).json({
                message: "Treatment deleted"
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete treatment",
            })
        }
    },
};