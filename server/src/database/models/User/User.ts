import * as Sequelize from 'sequelize';
import { primaryUUID } from 'lib/common';

interface UserAttributes {
	id?: string;
	email: string;
	password?: string;
	fk_userProfile_id?: string;
	thoughtCount?: number;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
	const attributes: SequelizeAttributes<UserAttributes> = {
		id: primaryUUID,
		fk_userProfile_id: DataTypes.UUID,
		email: { type: DataTypes.STRING, unique: true },
		password: { type: DataTypes.STRING },
		thoughtCount: { type: DataTypes.INTEGER, defaultValue: 0 }
	};

	const User = sequelize.define<UserInstance, UserAttributes>('User', attributes,
		{
			indexes: [
				{
					fields: ['fk_userProfile_id', 'id']
				}
			]
		}
	);
	
	User.associate = (models: any) => {
		User.belongsTo(models.UserProfile, { foreignKey: 'fk_userProfile_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); 
	};

	return User;
};