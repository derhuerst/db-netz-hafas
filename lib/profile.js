'use strict'

const products = require('./products')

const transformReqBody = (body) => {
	body.client = {id: 'DBZUGRADARNETZ', v: '0.1.0', type: 'WEB', name: 'webapp'}
	body.ext = 'DBNETZZUGRADAR.2'
	body.ver = '1.15'
	body.auth = {type: 'AID', aid: 'hf7mcf9bv3nv8g5f'}
	body.lang = 'deu'

	const req = (body.svcReqL || []).find(req => req.meth === 'HimGeoPos' || req.meth === 'HimDetails')
	if (req) req.cfg = {cfgGrpL: [], cfgHash: 'i74dckao7PmBwS0rbk0p'}

	return body
}

const dbNetzProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://db-livemaps.hafas.de/bin/mgate.exe',

	transformReqBody,
	products: products,

	remarks: true,
	remark: true
}

module.exports = dbNetzProfile
