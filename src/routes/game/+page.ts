export type GameData = {
	url: string;
	title: string;
};

export async function post({ request, platform }) {
	const counter = platform.env.COUNTER.idFromName('A');
}

export function load() {
	return {
		url: '/src/lib/images/Super_Mario_64_box_cover.jpg',
		title: 'Super Mario 64'
	} as GameData;
}
