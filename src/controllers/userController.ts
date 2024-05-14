import { Request, Response } from "express"
import { Users } from "../models/Users";
import { UserRole } from "../constants/UserRole";




export const userController = {

    async getAllUsers ( req: Request, res: Response ): Promise<void> {
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
            const totalPages = Math.ceil(totalUsers/ limit);
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

    async getAllStylist (req: Request, res: Response): Promise<void> {
        try {
            const stylistId = UserRole.STYLIST

            const [ stylist, totalStylist ] = await Users.findAndCount({
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
    }
};