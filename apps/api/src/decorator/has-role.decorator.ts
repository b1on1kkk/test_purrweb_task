import { SetMetadata } from '@nestjs/common';

import { roles } from '@prisma/client';

export const HasRoles = (...roles: Array<roles>) => SetMetadata('roles', roles);
