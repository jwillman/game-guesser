import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '$env/static/private';
import fetch from 'node-fetch';

export type GameData = {
	url: string;
	title: string;
};

type TwitchAccessToken = {
	access_token: string;
	expires_in: number;
	token_type: string;
};

type Game = {
	id: number;
	name: string;
};

type Image = {
	image_id: string;
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const accessToken = (await getAccessToken()).access_token;
	const games = (await callApi(
		`https://api.igdb.com/v4/games`,
		`fields name; limit 1; where rating > 90; offset ${getRandomInt(1, 100)};`,
		accessToken
	)) as Array<Game>;
	const game = games[0];

	const images = (await callApi(
		`https://api.igdb.com/v4/covers`,
		`fields *; where game = ${game.id};`,
		accessToken
	)) as Array<Image>;
	const imageUrl = `http://images.igdb.com/igdb/image/upload/t_cover_big_2x/${images[0].image_id}.jpg`;

	return {
		url: imageUrl,
		title: game.name
	} as GameData;
}

function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getAccessToken() {
	const response = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json'
			}
		}
	);
	if (!response.ok) {
		throw new Error(`Error! status: ${response.status}`);
	}
	return (await response.json()) as TwitchAccessToken;
}

async function callApi(url: string, body: string, accessToken: string) {
	const response = await fetch(url, {
		method: 'POST',
		body: body,
		headers: {
			Accept: 'application/json',
			'Client-ID': TWITCH_CLIENT_ID,
			Authorization: 'Bearer ' + accessToken
		}
	});
	if (!response.ok) {
		throw new Error(`Error! status: ${response.status}`);
	}
	return await response.json();
}
