import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '$env/static/private';

export type GameData = {
	url: string;
	title: string;
};

// // Access env variables:
// export async function post({ request, platform }) {
// 	const counter = platform.env.TEST;
// }

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		url: '/images/Super_Mario_64_box_cover.jpg',
		title: 'Super Mario 64'
	} as GameData;
}
