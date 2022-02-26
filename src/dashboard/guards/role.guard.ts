import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { log } from "console";
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        //reflector helps to get role values from decorators/actually from @SetMetadata
        //@SetMetaData('rolex',['admin','editor'])
        //we will get the role value(admin,editor) as an array using this.reflector.get<string[]>('rolex',context.getHandler()) 
        let roles = this.reflector.get<string[]>('roles', context.getHandler())
        console.log(roles)
        //to get usual request object,we need below code
        const request = context.switchToHttp().getRequest();
        let user = request.user
        //checking what we want
        //if true - handle Controller
        //if false -guard catches you
        let hasPermission = roles.some(sig => sig.includes(user.role))
        console.log(hasPermission)
        if (!hasPermission) {
            throw new UnauthorizedException({ msg: 'You have not permissions to access it', success: false })
        }
        return hasPermission
        //console.log('rolegurad req', request.user)

    }
}