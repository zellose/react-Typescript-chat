import models from 'database';
import * as crypto from 'crypto';
import * as Sequelize from 'sequelize';

import { IPayload, generate } from 'lib/token';
import UserProfile from '../UserProfile';

const {
	PASSWORD_SALT: secret_key
} = process.env;

interface IUser {
	email?: string;
	password?: string;
	display_name?: string;
	userProfileId?: string;
}

interface IUserMethod {
	hash(password: string): string;
	register({ email, password, userProfileId }: IUser): void;
	checkEmail(username: string): any;
	findByEmail(email: string): any;
}

export default class UserMethods implements IUserMethod {
	User = models.User;

	hash(password: string): string {
		return crypto.createHmac('sha512', secret_key!).update(password).digest('hex');
	}

	async register({ email, password, userProfileId }: IUser): Promise<any>{
		const { User, hash } = this;
		return User.build({
			fk_userProfile_id: userProfileId,
			email,
			password: hash(password)
		}).save().then(data => {
			const UserId = data.id;
			return User.findOne({
				where: {
					id: UserId
				},
				include: [{ model: models.UserProfile, attributes: ['display_name', 'thumbnail' ] }]
			}).then(result => result);
		});
	}

	findByEmail(email: string): any {
		const { User } = this;
		return User.findOne({
			where: { email },
			attributes: [ 'email', 'password', 'id' ],
			include: [{ model: models.UserProfile, attributes: [ 'display_name', 'thumbnail' ] }]
		}).then(data => 
		{
			const stringiedData = JSON.stringify(data);
			const parsedData = JSON.parse(stringiedData);
			return parsedData;
		});
	}

	async findById(userId: string): Promise<any> {
		const { User } = this;
		User.findOne({
			where: {
				id: userId
			},
			include: { model: models.UserProfile } as any
		}).then(data => data);
	}

	checkEmail(email: string): any {
		const { User } = this;
		return User.findOne({ where: { email }, attributes: ['email'], raw: true });
	}

	validatePassword(password: string, email: string) {
		const { hash, User } = this;
		const hashed = hash(password);
		return User.findOne({ 
			where : { email }, 
			attributes: ['password']
		}).then(data => {
			const stringiedData = JSON.stringify(data);
			const parsedData = JSON.parse(stringiedData);
			const parsedPassword = parsedData.password;
			return parsedPassword === hashed ? true : false;
		});
	}

	generateToken(id: string, profile: any) {
		const payload = {
			_id: id,
			profile
		};

		return generate(payload, 'account');
	}
}