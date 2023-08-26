const origin = 'http://localhost:3000';

export const LOGIN = 'login';
export const SIGNUP = 'signup';
export const DEAD_LINK = 'javascript: void(0);';
export const TODOS_API = `${origin}/todos`;
export const BLOGS_API = `${origin}/articles`;
export const VIDEOS_API = `${origin}/videos`;
export const ARTICLE_COMMENTS_API = articleId => `${origin}/articles/${articleId}/comment`;
export const VIDEO_COMMENTS_API = videoId => `${origin}/videos/${videoId}/comment`;
export const LOGIN_API = `${origin}/${LOGIN}`;
export const SIGNUP_API = `${origin}/${SIGNUP}`;
export const ENTER_KEY_CODE = 13;
