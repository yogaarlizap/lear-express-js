const { createTerminus } = require("@godaddy/terminus");

const serverConfig = (app, sequelize, { port, host }) => {
  const server = require("http").createServer(app);

  const healthCheck = () => {
    console.log("server healtcheck good");
  };
  // cleaning up before server stop
  const onSignal = () => {
    console.log("server is starting cleanup");
  };

  // shutoff
  const beforeShutdown = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 15000);
    });
  };

  // server shutdown
  const onShutdown = () => {
    console.log("cleanup finished, server is shutting down");
  };

  const startServer = () => {
    createTerminus(server, {
      logger: console.log,
      signal: "SIGINT",
      healthChecks: {
        "/healthcheck": healthCheck,
      },
      onSignal,
      onShutdown,
      beforeShutdown,
    }).listen(port, host, () => {
      console.log(
        "Express server listening on %d, in %s mode",
        port,
        app.get("env")
      );
    });
  };

  return {
    startServer,
  };
};

module.exports = serverConfig;