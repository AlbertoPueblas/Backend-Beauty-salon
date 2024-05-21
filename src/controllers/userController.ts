import { Request, Response } from "express"
import { Users } from "../models/Users";
import { UserRole } from "../constants/UserRole";
import bcrypt from "bcrypt";

//------------------------------------------------


export const userController = {

    async getAllStylist(req: Request, res: Response): Promise<void> {
        try {
            const stylistId = UserRole.STYLIST

            const [stylists, totalStylists] = await Users.findAndCount({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                },
                where: {
                    role: stylistId
                }
            });
            if (stylists.length === 0) {
                res.status(404).json({
                    message: "Stylist not found"
                });
                return;
            }

            res.status(200).json({
                stylists: stylists,
            });
        } catch (error) {
            res.status(500).json({
                message: "ups!, something went wrong"
            });

        }
    },

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            //Pagination
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 12;

            const [users, totalUsers] = await Users.findAndCount({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    isActive:true,
                },
                relations: {
                    clientDates: {

                    }
                },

                skip: (page - 1) * limit,
                take: limit,
            });
            if (users.length === 0) {
                res.status(404).json({
                    message: "Users not found"
                });
                return;
            }
            const totalPages = Math.ceil(totalUsers / limit);
            res.status(200).json({
                users: users,
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
            });
        } catch (error) {
            res.status(500).json({
                message: "ups!, something went wrong"
            });

        }
    },

    async getAppointmentById(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);

            const user = await Users.findOne({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                },
                relations: {
                    clientDates: {
                    }
                },
                where: {
                    id: userId
                }
            });

            if (!user) {
                res.status(400).json({
                    message: "User not found"
                })
                return;
            }

            res.json(user);
        } catch (error) {

        }
    },

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);

            const user = await Users.findOne({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true
                },
                relations : {
                    clientDates: true

                },
                where: {
                    id: userId
                }
            });

            if (!user) {
                res.status(400).json({
                    message: "User not found"
                })
                return;
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrive user"
            });
        }
    },

    async getMeAppointment(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId);

            const user = await Users.findOne({
                relations: {
                    clientDates: {
                        stylist: true,
                        treatment: true,
                    },
                },
                select: {
                    id: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    clientDates: {
                        id: true,
                        appointmentDate: true,
                        stylist: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                        treatment: {
                            id: true,
                            treatment: true,
                            price: true,
                        },
                    },
                },
                where: {
                    id: userId
                }
            });
            res.json(user);

        } catch (error) {
            res.json(500).json({
                message: "Failed to retrive appointment"
            })
        }
    },

    async getMeProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId);

            const user = await Users.findOne({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                },
                where: {
                    id: userId
                }
            });

            res.json(user);

        } catch (error) {
            res.status(500).json({
                message: "ups! profile not found"
            })
            return;
        }
    },

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId);

            const { currentPassword, password, ...resUserData } = req.body;

            const userToUpdate = await Users.findOne({ where: { id: userId } });

            if (!userToUpdate) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            }

            if (currentPassword && userToUpdate.password) {
                const isMatch = await bcrypt.compare(currentPassword, userToUpdate.password);
                if (!isMatch) {
                    res.status(401).json({ message: "Contraseña actual incorrecta" });
                    return;
                }
            }
    

            if (password) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                userToUpdate.password = hashedPassword;
            }

            Object.assign(userToUpdate, resUserData);

            await Users.save(userToUpdate)

            res.status(202).json({
                message: "User has been updated",
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to update dates",
                error: ( error as any ).message
            });
        }
    },

    async deleteProfileByUser (req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId)

            const userToDelete = await Users.findOne({ where: { id: userId } });
            if (!userToDelete) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            }

        // Actualizar el campo isActive a false
        userToDelete.isActive = false;
        await userToDelete.save();

        res.status(202).json({
            message: "User has been deactivated",
        });
        } catch (error) {
            res.status(500).json({
                message: "An error occurred while trying to delete the user"
            });
        }
    },

    async restoreProfileByAdmin (req: Request, res: Response): Promise<void> {
        try {
            const userRest = Number(req.params.id)
            const userToRestore = await Users.findOne({ where: { id: userRest } });

            if (!userToRestore) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            }
            userToRestore.isActive = true;
            await userToRestore.save();

            res.status(202).json({
                message: "User has been Activated",
            });

        } catch (error) {
            res.status(500).json({
                message: "An error occurred while trying to restore the user",
                error:(error as any).message
            });
        }
    },

    async deleteProfileByAdmin (req: Request, res: Response): Promise<void> {
        try {
            
            const userRest = Number(req.params.id);
            
            const userToDelete = await Users.delete({ id: userRest });

            if (userToDelete.affected === 0) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            }
            res.status(202).json({
                message: "User has been deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete user",
                error: (error as any).message
            });
        }
    },
};
