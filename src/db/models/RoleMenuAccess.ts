import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import SubMenu from "./SubMenu";
import Role from "./Role";

interface RoleMenuAccessAttributes {
  id?: number;
  roleId?: number | null;
  subMenuId?: number | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleMenuAccessInput
  extends Optional<RoleMenuAccessAttributes, "id"> {}
export interface RoleMenuAccessOutput
  extends Required<RoleMenuAccessAttributes> {}

class RoleMenuAccess
  extends Model<RoleMenuAccessAttributes, RoleMenuAccessInput>
  implements RoleMenuAccessAttributes
{
  public id!: number;
  public roleId!: number;
  public subMenuId!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RoleMenuAccess.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    roleId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    subMenuId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    active: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

RoleMenuAccess.belongsTo(SubMenu, {
  foreignKey: "subMenuId",
});

RoleMenuAccess.belongsTo(Role, {
  foreignKey: "roleId",
});

export default RoleMenuAccess;
