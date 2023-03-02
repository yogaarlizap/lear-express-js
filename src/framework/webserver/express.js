const express = require("express");
/**
 *
 * @param {import('express').Express} app
 */
const expressConfig = (app) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};