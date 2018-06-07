import * as Jwt from 'jsonwebtoken';
import { Context, Middleware } from 'koa';

const { JWT_SECRET } = process.env;

export interface IPayload {
	_id: string;
	profile: {
		display_name?: string;
		thumbnail?: string;
	};
}

export const generate = (payload: IPayload, options: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		Jwt.sign(
			payload,
			JWT_SECRET,
			{
				expiresIn: '7d'
			}, (error: Jwt.JsonWebTokenError, token: string): void => {
				if(error) reject(error);
				resolve(token);
			}
		);
	});
};

export const decodeToken = (token: string): Promise<any> => {
	return new Promise(
		(resolve, reject) => {
			Jwt.verify(token, JWT_SECRET, (error: Jwt.JsonWebTokenError, decoded: string): void => {
				if(error) reject(error);
				resolve(decoded);
			});
		}
	);
};

export const jwtMiddleware = async(ctx: Context, next: () => Promise<any>) => {
	const token = ctx.cookies.get('access_token');
	if(!token) return next();
	try {
		const decoded = await decodeToken(token);

		if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
			const { _id, profile } = decoded;
			const freshToken = await generate({ _id, profile }, 'account');
			ctx.cookies.set('access_token', freshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 7,
				httpOnly: true
			});
		}

		// console.log(`user set ${JSON.stringify(decoded)}`);
		ctx.user = decoded;

	} catch(e) {
		ctx.set('user', null);
		console.log(500, e);
	}
	return next();
};