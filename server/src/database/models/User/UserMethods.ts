import models from 'database';
import * as crypto from 'crypto';

import { generate } from 'lib/token';

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
		return User.findOne({
			where: {
				id: userId
			},
			include: [{ model: models.UserProfile }],
			raw: true
		});
	}

	findUserCount(userId: string) {
		const { User } = this;
		return User.findOne({
			where: {
				id: userId
			},
			attributes: ['thoughtCount'],
			raw: true
		});
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
			attributes: ['password'],
			raw: true
		}).then( data => {
			const result = data.password === hashed ? true : false;
			return result;
		});
	}

	generateToken(id: string, profile: any) {
		const payload = {
			_id: id,
			profile
		};

		return generate(payload, 'account');
	}

	increseThoughtCount(userId: string) {
		const { User } = this;
		
		User.findOne({ 
			where: {
				id: userId
			},
		}).then((data => 
		{
			return data.update({ thoughtCount: data.thoughtCount + 1 });
		}
		));
	}
}