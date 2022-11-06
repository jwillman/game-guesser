export type GameData = {
	url: string;
	title: string;
};

export function load() {
	return {
		url: 'https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg',
		title: 'Super Mario 64'
	} as GameData;
}
