import * as Sequelize from 'sequelize';
import { primaryUUID } from 'lib/common';

interface CommentAttributes {
	id: string;
	fk_post_id: string;
	fk_user_id: string;
	text: string;
}

type CommentInstance = Sequelize.Instance<CommentAttributes> & CommentAttributes;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
	const attributes: SequelizeAttributes<CommentAttributes> = {
		id: primaryUUID,
		fk_post_id: DataTypes.UUID,
		fk_user_id: DataTypes.UUID,
		text: DataTypes.STRING
	};

	const Comment = sequelize.define<CommentInstance, CommentAttributes>('Comment', attributes, {
		indexes: [
			{
				fields: ['id']
			}
		]
	});

	Comment.associate = (models: any) => {
		Comment.belongsTo(models.Post, { foreignKey: 'fk_post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
		Comment.belongsTo(models.User, { foreignKey: 'fk_user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
	};

	return Comment;
};