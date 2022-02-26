import { SetMetadata } from '@nestjs/common';

export const Rolex = (...roles: string[]) => SetMetadata('roles',roles)