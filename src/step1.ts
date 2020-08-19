import generate from "./generate";
import { Entity, PrimaryColumn, Column, ConnectionOptions } from "typeorm";

@Entity()
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
  console.log("*** Without index");
  console.log("********************");

  console.log("=> CHECK AND EXECUTE");
  await generate(connectionOptionsWithentity, true);
  console.log("=> CHECK");
  await generate(connectionOptionsWithentity, false);
};
