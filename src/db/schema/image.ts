import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

/* image table  */
export const image = mysqlTable("images",{
  id:varchar({length:36}).primaryKey(),
  imgName:varchar({length:50}).notNull(),
  category:varchar({length:50}).notNull(),
  imgLink:varchar({length:255}).notNull()
});