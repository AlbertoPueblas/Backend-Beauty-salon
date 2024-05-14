import { Request, Response, NextFunction } from "express";
import { UserRole } from "../constants/UserRole";

//-----------------------------------------------------------------------

export const authorize = (allowedRoles: string[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
      try{

         const userRole = req.tokenData.userRole;
         
         // Default access to admin
         if (userRole === UserRole.ADMIN.name,UserRole.STYLIST.name){
            return next();
         }
         
         
         // Access if the user role is in allowed roles
         if (allowedRoles.includes(userRole)) {
            return next();
         }
         
      } catch(error) {

         res.status(403).json({
            message: "Unauthorized access",
         })
      };
   }
};
