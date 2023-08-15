import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface SubMenuAttributes {
  id?: number;
  name?: string | null;
  masterMenuId?: number | null;
  url?: string | null;
  title?: string | null;
  icon?: string | null;
  ordering?: number | null;
  isTargetSelf?: number | null;
  active?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubMenuInput extends Optional<SubMenuAttributes, "id"> {}
export interface SubMenuOutput extends Required<SubMenuAttributes> {}

class SubMenu
  extends Model<SubMenuAttributes, SubMenuInput>
  implements SubMenuAttributes
{
  public id!: number;
  public name!: string;
  public masterMenuId!: number;
  public url!: string;
  public title!: string;
  public icon!: string;
  public ordering!: number;
  public isTargetSelf!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubMenu.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    masterMenuId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    url: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    icon: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    ordering: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    isTargetSelf: {
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

export default SubMenu;
