import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

export default (function () {
    return sequelize.define(
        "UserModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: "users",
            timestamps: true,
            updatedAt: "updated_at",
            createdAt: "created_at"
        }
    );
})();