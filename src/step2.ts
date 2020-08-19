import generate from "./generate";
import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  ConnectionOptions,
} from "typeorm";

@Entity()
@Unique("UNIQ_myentity_name", ["name"])
export class MyEntity {
  @PrimaryColumn()
  id!: number;
  @Column()
  name!: string;
}

export default async (connectionOptions: ConnectionOptions) => {
  const connectionOptionsWithentity = {
    ...connectionOptions,
    entities: [MyEntity],
  };
  console.log("********************");
  console.log("*** With index");
  console.log("********************");

  console.log("=> CHECK AND EXECUTE");
  await generate(connectionOptionsWithentity, true);
  console.log("=> CHECK");
  await generate(connectionOptionsWithentity, false);
};
