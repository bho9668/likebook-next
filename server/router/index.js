import authRoutes from './auth.routes';

// Config base routes url for authentication routes
function Router(app) {
  app.use(`${process.env.BASE_API_URL}/auth`, authRoutes); 
};

export default Router;