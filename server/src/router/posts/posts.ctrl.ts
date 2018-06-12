import { Context } from 'koa';
import * as Joi from 'joi';

import { UserMethods, PostMethods } from 'database/models';

const User = new UserMethods();
const Post = new PostMethods();

export default class PostCtrl {

	async write(ctx: Context) {

		interface BodySchema {
			content: string;
		}

		const { user } = ctx;
		if(!user) {
			ctx.status = 403; // forbidden
			ctx.body = { message: 'not logged in' };
			return;
		}

		let account;

		try {
			const { _id } = ctx.user;
			account = await User.findUserCount(_id);
		} catch(e) {
			console.log(500, e);
		}

		if(!account) {
			ctx.status = 403; // forbidden
			return;
		}
		
		const count = account.thoughtCount + 1;

		const schema = Joi.object().keys({
			content: Joi.string().min(5).max(1000).required()
		});

		const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

		if(result.error) {
			ctx.status = 400;
			return;
		}

		const { content }: BodySchema = ctx.request.body;

		let post;
		try {
			const { _id } = ctx.user;
			console.log(ctx.user);
			post = await Post.write({
				count,
				userId: _id,
				content
			});

			await User.increseThoughtCount(_id);
		} catch(e) {
			console.log(500, e);
		}
		ctx.body = post.dataValues;
	}

	async list(ctx: Context) {
		
		const { displayname, cursor } = ctx.query;

		const schema = Joi.object().keys({
			cursor: Joi.string().uuid(),
			displayname: Joi.string()
		});

		const result = Joi.validate(ctx.query, schema);

		if(result.error) {
			ctx.status = 400;
			return;
		}
		
		let posts;
		try {
			posts = await Post.list({ });
		} catch(e) {
			console.log(500, e);
		}

		const next = posts.length === 20 ? `/api/posts/?${displayname ? `displayname=${displayname}&` : ''}cursor=${posts[19].id}` : null;

		ctx.body = {
			next,
			data: posts
		};
	}
}