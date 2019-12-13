'use strict'

const a = require('assert')

const createClient = require('.')
const client = createClient('db-netz-hafas test')

const isNonEmptyStr = str => 'string' === typeof str && str.length > 0
const isValidISODate = str => 'string' === typeof str && !Number.isNaN(+new Date(str))

const checkRemark = (r) => {
	a.ok(r)
	if (r.id !== null) a.ok(isNonEmptyStr(r.id))
	if (r.type !== null) a.ok(isNonEmptyStr(r.type))
	if (r.summary !== null) a.ok(isNonEmptyStr(r.summary))
	if (r.text !== null) a.ok(isNonEmptyStr(r.text))
	if (r.priority !== null) a.strictEqual(typeof r.priority, 'number')
	if (r.category !== null) a.strictEqual(typeof r.category, 'number')
	if ('validFrom' in r) a.ok(isValidISODate(r.validFrom))
	if ('validUntil' in r) a.ok(isValidISODate(r.validUntil))
	if ('modified' in r) a.ok(isValidISODate(r.modified))
}

client.remarks({
	north: 52.643063,
	west: 12.943267,
	south: 52.354634,
	east: 13.822174
})
.then((remarks) => {
	a.ok(Array.isArray(remarks))
	a.ok(remarks.length > 0)
	for (const remark of remarks) checkRemark(remark)

	return client.remark(remarks[0].id)
})
.then(checkRemark)
.catch((err) => {
	console.error(err)
	process.exit(1)
})
