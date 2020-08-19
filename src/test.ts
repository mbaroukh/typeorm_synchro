import step1 from "./step1";
import step2 from "./step2";
import tmp from "tmp";
import fs from "fs";
import { ConnectionOptions } from "typeorm";

const main = async () => {
  const filename = tmp.tmpNameSync();

  const connectionOptionsSqlite: ConnectionOptions = {
    type: "sqlite",
    database: filename,
    synchronize: false,
  } as ConnectionOptions;

  const connectionOptionsMysql: ConnectionOptions = {
    type: "mysql",
    database: "typeorm",
    host: "localhost",
    username: "typeorm",
    password: "typeorm",
    port: 3306,
    synchronize: false,
  } as ConnectionOptions;
  console.log("process.argv:", process.argv);
  const connectionOptions =
    process.argv.length > 2 && process.argv[2] === "mysql"
      ? connectionOptionsMysql
      : connectionOptionsSqlite;

  await step1(connectionOptions);
  await step2(connectionOptions);

  fs.existsSync(filename) && fs.unlinkSync(filename);
};

main();
