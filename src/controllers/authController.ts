import { Request, Response } from "express";
import { Users } from "../models/Users";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRole";
import jwt from "jsonwebtoken";

//----------------------------------------------


export const authController = {
    
    async register (req: Request, res: Response): Promise<void> {
        try {

            const { firstName, email, password } = req.body;

            if( !firstName || !email || !password ) {
                res.status(400).json ({
                    message: 'Please fill all fields'
                });
                return;
            }
            //Email ya en uso
            const user = await Users.find();
            for (let element of user) {
                if (element.email === email) {
                    res.status(400).json ({
                        message: 'Email already in use'
                    });
                    return;
                }
            };
            //Contraseña haseada
            const hasedPassword = bcrypt.hashSync( password, 10 );

            const newUser = Users.create({
                firstName: firstName,
                email: email,
                password:  hasedPassword,
                role: UserRoles.CLIENT,
            });

            await Users.save(newUser);
            res.status(201).json ({
                message: 'User created'
            });
            
        } catch (error) {
            res.status(500).json({
                message: "Failed to create user",
                error: (error as any)
            })  
        }
    },

    async login (req: Request, res: Response ): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log(req.body);

            if( !email || !password ) {
                res.status(400).json ({
                    message: 'Please fill all fieldsssss'
                });
                return;
            }

            const user = await Users.findOne({
                relations: {
                    role: true,
                 },
                 where: {
                    email: email 
                },
                 select: { 
                    id: true, 
                    email: true, 
                    password: true 
                },
            });
            if (!user) {
                res.status(400).json ({
                    message: 'User not found'
                });
                return;
            }
            const isPasswordValid = bcrypt.compareSync( password, user.password );
            if (!isPasswordValid) {
                res.status(400).json ({
                    message: 'Invalid credentials'
                });
                return;
            }
            const tokenPayload = {
                userId: user.id,
                userRole: user.role.name,
            };

            const token = jwt.sign(
                tokenPayload,
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "1d",
                }
            );

            res.status(200).json ({
                message: "Login sucessfuly",
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to login",
                error: (error as any)
            })
            
        }

    }
};