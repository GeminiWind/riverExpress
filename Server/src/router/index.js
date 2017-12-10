import { login, register, getUser, articleController, commentController } from '../app/Http/Controllers';
import * as validator from '../app/Http/Request';

const initializeRoutes = (app, passport) => {
  const auth = passport.authenticate('jwt', {
    session: false,
  });

  app.post('/login', validator.loginRequest, login);
  app.post('/register', validator.registerRequest, register);
  app.get('/user', auth, getUser);
  // Article
  app.get('/articles', articleController.index);
  app.post('/articles', articleController.store);
  app.get('/articles/popular', articleController.popular);
  app.get('/articles/:slug', articleController.show);
  app.put('/article/:slug', articleController.update);
  app.delete('/articles/:slug', articleController.destroy);
  // Comment on specified article
  app.post('/articles/:slug/comment', auth, commentController.store);
};

export { initializeRoutes };
