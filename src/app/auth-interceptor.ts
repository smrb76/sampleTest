import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { RegisterService } from './services/register.service';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private registerService: RegisterService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.registerService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + authToken)
        });
        return next.handle(authRequest);
    }
}