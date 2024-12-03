import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";

interface UserAttributes {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    dni: string;
    status: number;
}

export const User = sequelize.define<Model<UserAttributes>>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [8, 12]
        }
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isIn: [[0, 1]]
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true
});
