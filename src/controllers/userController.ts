import { Request, Response } from "express"
import { Users } from "../models/Users";
import { UserRole } from "../constants/UserRole";
import bcrypt from "bcrypt";

//------------------------------------------------


export const userController = {

    async getAllStylist(req: Request, res: Response): Promise<void> {
        try {
            const stylistId = UserRole.STYLIST

            const [stylist] = await Users.findAndCount({
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
            if (stylist.length === 0) {
                res.status(404).json({
                    message: "Stylist not found"
                });
                return;
            }

            res.status(200).json({
                stylist: stylist,
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
            const limit = Number(req.query.limit) || 25;

            const [users, totalUsers] = await Users.findAndCount({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
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
                    phone: true,
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
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    clientDates: true,
                },
                relations: {
                    clientDates: {
                    }
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

            const { password, ...resUserData } = req.body;

            const userToUpdate = await Users.findOne({ where: { id: userId } });

            if (!userToUpdate) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            }

            if (password) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                userToUpdate!.password = hashedPassword;
            }

            const updatedUser: Partial<Users> = {
                ...userToUpdate,
                ...resUserData,
            };

            await Users.save(updatedUser)

            res.status(202).json({
                message: "User has been updated",
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to update dates",
            });
        }
    }
};
