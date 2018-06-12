import * as Sequelize from 'sequelize';
import { primaryUUID } from 'lib/common';

interface PostAttributes {
	id?: string;
	fk_user_id?: string;
	count?: number;
	likesCount?: number;
	likes?: string[];
	content?: string;
	displayname?: string;
}

type PostInstance = Sequelize.Instance<PostAttributes> & PostAttributes;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
	const attributes: SequelizeAttributes<PostAttributes> = {
		id: primaryUUID,
		fk_user_id: DataTypes.UUID,
		count: { type: DataTypes.INTEGER, defaultValue: 0 },
		likesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
		likes: DataTypes.ARRAY(DataTypes.STRING),
		content: DataTypes.TEXT,
		displayname: DataTypes.STRING
	};

	const Post = sequelize.define<PostInstance, PostAttributes>('Post', attributes, {
		indexes: [
			{
				fields: ['id']
			}
		]
	});

	Post.associate = (models: any) => {
		Post.belongsTo(models.User, { foreignKey: 'fk_user_id',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });
	};

	return Post;
};
