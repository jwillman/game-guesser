export type GameData = {
	url: string;
	title: string;
};

export function load() {
	return {
		url: '/src/lib/images/Super_Mario_64_box_cover.jpg',
		title: 'Super Mario 64'
	} as GameData;
}
