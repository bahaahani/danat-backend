import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Add your authentication logic here
        // For example, you can check if the user is authenticated or has valid credentials
        // If the user is authenticated, return true to allow access, otherwise return false

        // Replace this with your authentication logic
        const isAuthenticated = true;

        return isAuthenticated;
    }
}