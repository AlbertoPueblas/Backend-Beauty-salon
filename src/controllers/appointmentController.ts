import { Request, Response } from "express"
import { Users } from "../models/Users";
import { Appointment } from "../models/Appointment";

//---------------------------------------

export const appointmentController = {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId)

            const { appointmentDate, treatmentId, stylistId } = req.body;

            if (!appointmentDate || !treatmentId || !stylistId) {
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
                treatmentId: treatmentId,
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
            const limit = Number(req.query.limit) || 15;

            const [appointment, totalAppointment] = await Appointment.findAndCount({

                relations: {
                    client: true,
                    treatment: true,
                    stylist: true,
                },
                select: {
                    id: true,
                    appointmentDate: true,
                    userId: true,
                    treatmentId: true,
                    stylistId: true,
                    client: {
                        firstName: true,
                        email: true,
                        phone: true,
                    },
                    treatment: {
                        treatment: true,
                    },
                    stylist: {
                        firstName: true,
                    }
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
                error: (error as any)
            });
        }
    },

    async getAppointmentById(req: Request, res: Response): Promise<void> {
        try {
            const appointmentId = Number(req.params.id);

            const appointment = await Appointment.findOne({
                relations: {
                    client: true,
                    treatment: true,
                    stylist: true,
                },
                select: {
                    id: true,
                    appointmentDate: true,
                    userId: true,
                    treatmentId: true,
                    stylistId: true,
                    stylist: {
                        firstName: true,
                    },
                    treatment: {
                        treatment: true,
                    }
                },
                where: {
                    id: appointmentId
                }
            });
            console.log("appooint", appointment);

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
            const { id, appointmentDate, stylistId, treatmentId } = req.body;

            const dateToUpdate = await Appointment.findOne({ where: { id } });
            if (!dateToUpdate) {
                res.status(404).json({ message: "Date not found" });
                return;
            }

            dateToUpdate.appointmentDate = appointmentDate;
            dateToUpdate.stylistId = stylistId;
            dateToUpdate.treatmentId = treatmentId;

            await dateToUpdate.save();

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
    },
    async updateByAdminStylist(req: Request, res: Response): Promise<void> {
        try {
            const appointmentId = Number(req.params.id);

            // Desestructurar los campos que se deben actualizar desde el cuerpo de la solicitud
            const { ...updateDate } = req.body;

            // Buscar la cita por ID
            const appointmentToUpdate = await Appointment.findOne({ where: { id: appointmentId } });
            if (!appointmentToUpdate) {
                res.status(404).json({ message: "Appointment not found" });
                return;
            }

            // Actualizar los campos de la cita
            Object.assign(appointmentToUpdate, updateDate);

            // Guardar los cambios
            await appointmentToUpdate.save();

            // Responder con la cita actualizada
            res.status(200).json(appointmentToUpdate);

        } catch (error) {
            // Manejo de errores
            console.error(error);
            res.status(500).json({ message: "Failed to update appointment" });
        }
    },

    async deleteAppointmentByAdmin(req: Request, res: Response): Promise<void> {
        try {
            const appointment = Number(req.params.id);

            const deleteByAdmin = await Appointment.delete(appointment);
            if (!deleteByAdmin) {
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
    },

    async getUsersByStylist(req: Request, res: Response): Promise<void> {
        try {

            //Pagination
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const stylistId = Number(req.tokenData.userId)

            const [appointment, totalAppointment] = await Appointment.findAndCount({
                relations: {
                    stylist: true,
                    client: true,
                    treatment: true
                },
                select: {
                    client: {
                        firstName: true,
                        email: true,
                        phone: true,
                    },
                    stylist: {
                        firstName: true,
                    },
                    treatment: {
                        treatment: true,
                        price: true,
                    }
                },
                where: {
                    stylist: { id: stylistId },
                },
                skip: (page - 1) * limit,
                take: limit,

            });

            if (appointment.length === 0) {
                res.status(404).json({
                    message: "No assigned users found",
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
                message: "Ups! Something went wrong",
                error: (error as any).message,
            });
        }
    },
};