import models from 'database';

interface Write {
	count: number;
	userId: string;
	content: string;
}

interface List {
	cursor?: string;
	userId?: string;
	self?: string;
}

interface IPostMethods {
	write({ count, userId, content }: Write): any;
}

export default class PostMethods implements IPostMethods {
	Posts = models.Post;

	write({ count, userId, content }: Write): any {
		const { Posts } = this;
		return Posts.build({
			count,
			content,
			fk_user_id: userId
		}).save();
	}

	list({ cursor, userId, self }: List) {
		const { Posts } = this;
		const query = Object.assign(
			{},
			cursor ? { id: { $lt: cursor } } : {},
			userId ? { fk_user_id: userId } : {}
		);

		return Posts.findAll({
			where: query,
			order: [
				['id', 'DESC']
			],
			limit: 20,
			raw: true
		});
	}
}