import { Context } from 'koa';
import * as Joi from 'joi';

import { UserMethods, UserProfileMethods } from 'database/models';

const User = new UserMethods();
const UserProfile = new UserProfileMethods();

export default class AuthCtrl {

	async localRegister(ctx: Context) {
		
		interface BodySchema {
			email: string;
			password: string;
			display_name: string;
		}

		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			display_name: Joi.string().required()
		});

		const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

		if(result.error) {
			console.log(`register validator error ${result.error}`);
			ctx.status = 400; // Bas request;
			return;
		}

		try {
			const { display_name, email }: BodySchema = ctx.request.body;
			const existsDisplayname = await UserProfile.checkDisplayname(display_name);
			const existsEmail = await User.checkEmail(email);

			if(existsDisplayname || existsEmail) {
				ctx.status = 409; // Conflict;
				ctx.body = {
					key: existsEmail ? 'email' : 'display_name'
				};
				return;
			}
		} catch(e) {
			console.log(500, e);
		}

		try {
			const { email, display_name, password }: BodySchema = ctx.request.body;

			const userProfileId = await UserProfile.register(display_name); // ok
			const user = await User.register({ email, password, userProfileId });
			const token = await User.generateToken(user.id, user.UserProfile.dataValues);
			ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 24 * 7 });
			
			ctx.body = user.UserProfile.dataValues;
		} catch(e) {
			console.log(500, e);
		}
	}

	async localLogin(ctx: Context) {
		interface BodySchema {
			email: string;
			password: string;
		}

		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required()
		});

		const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

		if(result.error) {
			ctx.status = 400; // Bad request;
			return;
		}

		try {
			const { email, password }: BodySchema = ctx.request.body;
			const existsEmail = await User.checkEmail(email);
			const validatePassword = await User.validatePassword(password, email);
			if(!existsEmail || !validatePassword) {
				ctx.status = 403;
				return;
			}

			const account = await User.findByEmail(email);
			const token = await User.generateToken(account.id, account.UserProfile);

			ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 60 * 24 * 7 });
			ctx.body = account.UserProfile;
		} catch(e) {
			console.log(500, e);
		}
	}

	async exists(ctx: Context) {
		const { key, value } = ctx.params;

		try {
			const exists = await (key === 'email' ? User.checkEmail(value) : UserProfile.checkDisplayname(value));
			
			ctx.body = {
				exists: exists !== null
			};
		} catch(e) {
			console.log(500, e);
		}
	}

	async logout(ctx: Context) {
		ctx.cookies.set('access_token', null, {
			maxAge: 0,
			httpOnly: true
		});

		ctx.status = 204;
	}

	async check(ctx: Context) {
		const { user } = ctx;
		if(!user) {
			ctx.status = 403; // Forbidden
			return;
		}
		ctx.body = user.profile;

	}
}