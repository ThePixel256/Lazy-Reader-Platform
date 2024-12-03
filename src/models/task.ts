import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM('pending', 'completing', 'all', 'founded'),
            allowNull: false,
        },
        isEdited: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'tasks',
        timestamps: true,
    }
);
