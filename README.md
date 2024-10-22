# Startpage

>Startpage with a shell like interface , use [data.json](./src/data.json) for user configurations.

Built with [astro](https://astro.build/)

## Screenshot

![Screenshot](./screenshot.png)

## Example of config.json

```json
{
	"clock": {
		"url": "https://calendar.google.com/calendar/"
	},

	"shortcuts": {
		"reddit": [
			{
				"title": "COW",
				"url": "https://www.reddit.com/r/Competitiveoverwatch/"
			},
			{
				"title": "MouseReview",
				"url": "https://www.reddit.com/r/MouseReview/"
			},
			{
				"title": "mk",
				"url": "https://www.reddit.com/r/MechanicalKeyboards/"
			}
		],
		"social": [
			{
				"title": "Discord",
				"url": "https://discordapp.com/app"
			},
			{
				"title": "Twitter",
				"url": "https://twitter.com/"
			},
			{
				"title": "WhatsApp",
				"url": "https://web.whatsapp.com/"
			}
		],
		"work": [
			{
				"title": "Drive",
				"url": "https://drive.google.com/"
			},
			{
				"title": "Gmail",
				"url": "https://gmail.google.com/"
			},
			{
				"title": "Keep",
				"url": "https://keep.google.com/"
			}
		],
		"ssh": [
			{
				"title": "desktop",
				"url": "ssh://rex.ky.ng@home.com"
			},
			{
				"title": "nextcloud",
				"url": "ssh://rex.ky.ng@timescam.duckdns.org"
			},
			{
				"title": "media",
				"url": "ssh://rex.ky.ng@media-server.duckdns.org"
			}
		]
	},

	"search": "https://search.brave.com/search"
}
```

## License

[The Unlicense](LICENSE)
