import models from 'database';

interface IUserProfile {
	register(display_name: string): Promise<string>;
	checkDisplayname(display_name: string): any;
}

export default class UserProfileMethods implements IUserProfile {
	UserProfile = models.UserProfile;

	async register(display_name: string): Promise<string> {
		const { UserProfile } = this;
		const userId = await UserProfile.build({
			display_name
		}).save().then(
			data => data.id
		);
		return userId;
	}

	checkDisplayname(display_name: string): any {
		const { UserProfile } = this;
		return UserProfile.findOne({
			where: { 
				display_name
			},
			attributes: [ 'display_name' ]
		}).then(data => data);
	}
}