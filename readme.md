# `db-netz-hafas@1`

**Deprecated. Use [`db-netz-hafas@latest`](https://github.com/derhuerst/db-netz-hafas).**

---

**Fetch [Betriebsstellen & disturbances in the German rail network](https://strecken.info/) from the DB Netz HAFAS endpoint.**

This project is actually a thin wrapper around [`hafas-client@4`](https://github.com/public-transport/hafas-client/tree/4#hafas-client). [Its docs](https://github.com/public-transport/hafas-client/tree/4/docs) document the API in general.

[![npm version](https://img.shields.io/npm/v/db-netz-hafas.svg)](https://www.npmjs.com/package/db-netz-hafas)
[![build status](https://api.travis-ci.org/derhuerst/db-netz-hafas.svg?branch=master)](https://travis-ci.org/derhuerst/db-netz-hafas)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/db-netz-hafas.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install db-netz-hafas
```


## Usage

```js
const createClient = require('db-netz-hafas')

const client = createClient('my awesome program')

client.remarks({
	north: 52.643063,
	west: 12.943267,
	south: 52.354634,
	east: 13.822174
})
.then(console.log)
.catch(console.error)
```

```js
[
	{
		type: 'warning',
		summary: 'Gleiswechselbetrieb vorübergeh.',
		text: 'Brückenarbeiten Grundsperrung F1G, Nb SÜ Rhinstraßenbrücke in Biesdf Kr West Abzw',
		priority: 65,
		category: 1,
		validFrom: '2018-12-09T00:00:00.000+01:00',
		validUntil: '2019-11-28T04:00:00.000+01:00',
		modified: '2019-03-02T02:47:18.000+01:00'
	}, {
		type: 'warning',
		summary: 'Störung: Störung am Fahrweg  - Weichenstörung',
		text: 'BWSS, Weiche 447 in beiden Lagen gestört.\n\nLinie S 7 (Stamm) BAF - BWSS, Gl. 431 und BGRI - BPDH bzw. BWSS Gl. 434 - BAF \nLinie S 7 (Tag) BAF - BWSS, Gl. 434 dabei von BNIS - BWSS auf dem Gegengleis sowie BPDH - BGRI bzw. BWSS, Gl. 431 - BAF, dabei BWSS - BNIS auf dem Gegengleis\nSEV BWSS <> BGRI\n\nAb ca. 15 Uhr b.a.w. 20 min Takt der S 7 zwischen Potsdam und Wannsee.',
		priority: 8,
		category: null,
		validFrom: '2019-03-27T12:14:00.000+01:00',
		validUntil: '2019-03-27T22:00:00.000+01:00',
		modified: '2019-03-27T14:38:41.000+01:00'
	}
	// …
]
```


## Contributing

If you have a question or need support using `db-netz-hafas`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/db-netz-hafas/issues).
