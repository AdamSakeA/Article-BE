import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Role from "./Role";

interface UserAttributes {
  id?: number;
  fullName?: string | null;
  username?: string | null;
  email?: string | null;
  roleId?: number | null;
  password?: string | null;
  accessToken?: string | null;
  verified?: boolean | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<UserAttributes, "id"> {}
export interface RoleOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, RoleInput> implements UserAttributes {
  public id!: number;
  public fullName!: string;
  public username!: string;
  public email!: string;
  public roleId!: number;
  public password!: string;
  public accessToken!: string;
  public verified!: boolean;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    fullName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    roleId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    password: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    accessToken: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    verified: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    active: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

User.belongsTo(Role, { foreignKey: "roleId" });

export default User;
