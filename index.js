'use strict'

const createHafasClient = require('hafas-client')
const request = require('hafas-client/lib/request')
const _profile = require('./lib/profile')

const isNonEmptyString = str => 'string' === typeof str && str.length > 0

const createClient = (userAgent) => {
	const client = createHafasClient(_profile, userAgent)
	const {profile} = client

	const remarks = ({north, west, south, east}, opt) => {
		if ('number' !== typeof north) throw new TypeError('north must be a number.')
		if ('number' !== typeof west) throw new TypeError('west must be a number.')
		if ('number' !== typeof south) throw new TypeError('south must be a number.')
		if ('number' !== typeof east) throw new TypeError('east must be a number.')
		if (north <= south) throw new Error('north must be larger than south.')
		if (east <= west) throw new Error('east must be larger than west.')

		opt = Object.assign({
			results: 1000, // maximum number of results
			polylines: false, // return track shapes?
			disturbances: true, // Störungen
			constructionWorks: true, // Baustellen
			closedTracks: true // Betriebsruhe
		}, opt || {})
		opt.fromWhen = new Date(opt.fromWhen || Date.now())
		if (Number.isNaN(+opt.fromWhen)) throw new TypeError('opt.fromWhen is invalid')
		opt.toWhen = new Date(opt.toWhen || Date.now())
		if (Number.isNaN(+opt.toWhen)) throw new TypeError('opt.toWhen is invalid')

		const himFilters = []
		if (opt.disturbances) himFilters.push({type: 'HIMCAT', mode: 'INC', value: '0'})
		if (opt.constructionWorks) himFilters.push({type: 'HIMCAT', mode: 'INC', value: '1'})
		if (opt.closedTracks) himFilters.push({type: 'HIMCAT', mode: 'INC', value: '2'})

		return request(profile, userAgent, {...opt, remarks: true}, {
			meth: 'HimGeoPos',
			req: {
				rect: profile.formatRectangle(profile, north, west, south, east),
				maxNum: opt.results,
				dateB: profile.formatDate(profile, opt.fromWhen),
				timeB: profile.formatTime(profile, opt.fromWhen),
				dateE: profile.formatDate(profile, opt.toWhen),
				timeE: profile.formatTime(profile, opt.toWhen),
				getPolyLine: !!opt.polylines,
				himFltrL: himFilters
				// todo: `onlyHimId`, `prio`
			}
		})
		.then(d => d.warnings)
	}

	const remark = (id, opt = {}) => {
		if (!isNonEmptyString(id)) throw new TypeError('id must be a non-empty string.')

		opt.fromWhen = new Date(opt.fromWhen || Date.now())
		if (Number.isNaN(+opt.fromWhen)) throw new TypeError('opt.fromWhen is invalid')
		if (!opt.toWhen) opt.toWhen = opt.fromWhen
		else if (Number.isNaN(+opt.toWhen)) throw new TypeError('opt.toWhen is invalid')

		return request(profile, userAgent, {...opt, remarks: true}, {
			meth: 'HimDetails',
			req: {
				input: id,
				date: profile.formatDate(profile, opt.fromWhen),
				time: profile.formatTime(profile, opt.fromWhen),
				endDate: profile.formatDate(profile, opt.toWhen),
				endTime: profile.formatTime(profile, opt.toWhen)
			}
		})
		.then((d) => {
			const warning = d.warnings[d.msgRefL[0]]
			if (!warning) throw new Error('invalid response')
			return warning
		})
	}

	return {remarks, remark}
}

module.exports = createClient
