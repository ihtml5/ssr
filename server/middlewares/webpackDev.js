module.exports = middleware => {
  const koaDevMiddleware = async (ctx, next) => {
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content;
      },
      setHeader: (name, value) => {
        ctx.set(name, value);
      },
    }, next);
  };

  return koaDevMiddleware;
};