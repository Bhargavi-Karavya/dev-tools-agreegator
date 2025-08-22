import { DataTypes, Model } from "sequelize";
import sequelize from "@/lib/db";

class Snippet extends Model {
  public id!: number;
  public code!: string;
}

Snippet.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "snippets",
  }
);

export default Snippet;
