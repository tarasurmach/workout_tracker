import {
  createParamDecorator,
  ExecutionContext,
  Request,
} from "@nestjs/common";
const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return typeof data === "string" ? request.user?.[data] : request.user;
});
export default User;
