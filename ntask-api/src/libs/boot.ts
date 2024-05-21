export function boot(app) {
  app.db.sync().done(() => {
    app.listen(app.get("port"), () => {
      console.log(`NTask API - Port ${app.get("port")}`);
    });
  });
}
