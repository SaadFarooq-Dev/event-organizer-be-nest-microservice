import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RpcContextSwitchGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToRpc().getData();
    req.body = { ...req };
    return true;
  }
}
