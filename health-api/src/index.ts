import "reflect-metadata";
import { bootstrap } from "vesper";
import { createConnection } from "typeorm";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

import { User } from "./entity/User";
import { Points } from "./entity/Points";
import { PointsController } from "./controller/PointsController";

bootstrap({
  port: 4000,
  controllers: [PointsController],
  entities: [Points, User],
  schemas: [`${__dirname}/schema/**/*.graphql`],
  cors: true,
  customResolvers: {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime
  }
})
  .then(() => {
    console.log(
      `> Running at http://localhost:4000\n> GQL Playground at http://localhost:4000/playground`
    );
  })
  .catch(error => {
    console.error(error.stack ? error.stack : error);
  });

createConnection()
  .then(async connection => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch(error => console.log(error));
