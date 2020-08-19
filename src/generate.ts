import { ConnectionOptions, createConnection } from "typeorm";

const main = async (connectionOptions: ConnectionOptions, execute: boolean) => {
  const connection = await createConnection(connectionOptions);

  const sqlInMemory = await connection.driver.createSchemaBuilder().log();
  const queries = sqlInMemory.upQueries;
  if (queries.length === 0) {
    console.log("already in sync");
  } else {
    for (let i = 0; i < queries.length; i++) {
      const upQuery = queries[i];
      console.log(`${execute ? "EXECUTING " : ""}Query ${i}: ${upQuery.query}`);
      if (execute) {
        await connection.query(upQuery.query);
      }
    }
  }
  await connection.close();
};

export default main;
