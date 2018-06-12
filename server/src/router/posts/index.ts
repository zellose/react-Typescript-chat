import * as Router from 'koa-router';

import PostCtrl from './posts.ctrl';

const postCtrl = new PostCtrl();

// path: /api/posts

export class PostsRouter {
	posts: Router = new Router();

	constructor() {
		this.routes();
	}

	routes(): void {
		const { posts } = this;
		posts.post('/', postCtrl.write);
		posts.get('/', postCtrl.list);

	}
}

const postsRouter = new PostsRouter();
const posts = postsRouter.posts;

export default posts;