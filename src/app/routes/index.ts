import { Router } from 'express';
import { ProductRoutes } from '../modules/Product/product.route';

const router = Router();

// All the routes in the project
const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
];

// lopping through the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
