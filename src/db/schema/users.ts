import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

/*  user table  */
export const user = mysqlTable("users",{
     id:varchar({length:36}).primaryKey(),
     firstName:varchar({length:20}).notNull(),
     lastName:varchar({length:20}).notNull(),
     email:varchar({length:50}).notNull().unique(),
     password:varchar({length:150}).notNull(),
});