import { Router } from 'express';
import { CarRoutes } from '../modules/Product/product.route';

const router = Router();

// All the routes in the project
const moduleRoutes = [
  {
    path: '/cars',
    route: CarRoutes,
  }
];

// lopping through the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
