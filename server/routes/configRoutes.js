import authRoutes from './authRoutes.js'
import userRoutes from './usersRoutes.js'
import postRoutes from './postRoutes.js'


const initRoutes = (app) => {
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/posts', postRoutes);
}

export default initRoutes;
