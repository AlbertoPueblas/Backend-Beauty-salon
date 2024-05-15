import { Request, Response } from "express"
import { Users } from "../models/Users";
import { Appointment } from "../models/Appointment";

//---------------------------------------

export const appointmentController = {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId)

            const { appointmentDate, treatsmentId, stylistId } = req.body;

            if (!appointmentDate || !treatsmentId || !stylistId) {
                res.status(400).json({
                    message: "Invalid data"
                });
                return;
            }
            const user = await Users.findOne({
                where: {
                    id: userId
                }
            });
            const appointmentCreate = Appointment.create({
                appointmentDate: appointmentDate,
                treatsmentId: treatsmentId,
                stylistId: stylistId,
                userId: userId
            });

            await appointmentCreate.save();
            res.status(200).json({
                message: "Appointment created"
            })
        } catch (error) {
            res.status(500).json({
                message: "Failed to create date",
                error: (error as any)
            });
        }
    },

    async getAllAppointment(req: Request, res: Response): Promise<void> {
        try {
            //pagination
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 25;

            const [appointment, totalAppointment] = await Appointment.findAndCount({
                select: {
                    id: true,
                    appointmentDate: true,
                    userId: true,
                    treatsmentId: true,
                    stylistId: true,
                },
                skip: (page - 1) * limit,
                take: limit,
            });

            if (appointment.length === 0) {
                res.status(404).json({
                    message: "Appointment not found"
                });
                return;
            }

            const totalPages = Math.ceil(totalAppointment / limit);

            res.status(200).json({
                appointment: appointment,
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
            });
        }
    },

    async getAppointmentById(req: Request, res: Response): Promise<void> {
        try {
            const appointmentId = Number(req.params.id);

            const appointment = await Appointment.findOne({
                select: {
                    id: true,
                    appointmentDate: true,
                    userId: true,
                    treatsmentId: true,
                    stylistId: true,
                },
                where: {
                    id: appointmentId
                }
            });
            if (!appointment) {
                res.status(404).json({
                    message: "Appointment not found"
                });
                return;
            }
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve Date",
                error: (error as any).message
            });
        }
    },

    async updateAppointment(req: Request, res: Response): Promise<void> {
        try {
            const dateId = Number(req.tokenData.id)
            
            const {...resDatesData} = req.body;
            
            console.log(resDatesData, " yo soy data");
            const dateToUpdate = await Appointment.findOne({where: {id: resDatesData.id}});
                if(!dateToUpdate) {
                    res.status(404).json({ message: "Date not found" });

                    return;
                }
                
                const updatedDate: Partial<Appointment> = {
                    ...dateToUpdate,
                    ...resDatesData,
                    id: Number(resDatesData.id)
                };
                
                await Appointment.save(updatedDate);

                res.status(202).json({
                    message: "Appointment has been updated",
                });
                
            } catch (error) {
                res.status(500).json({
                    message: "Update not found",
                    error: (error as any).message,
                });      
            }      
        },
    

        async deleteAppointment(req: Request, res: Response): Promise<void> {
            try {
                const appointmentId = Number(req.params.id);
                
                const appointmentToDelete = await Appointment.delete(appointmentId);
                if (appointmentToDelete.affected === 0) {
                    res.status(404).json({
                        message: "Appointment not found"
                    });
                    return;
                }
                res.status(200).json({
                    message: "Appointment has been deleted"
                });
        
            } catch (error) {
                res.status(500).json({
                    message: "Failed to delete appointment",
                    error: (error as any).message
            })
        }
    }
};