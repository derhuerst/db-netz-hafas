'use strict'

const createClient = require('.')

const client = createClient('db-netz-hafas example')

client.remarks({
	north: 52.643063,
	west: 12.943267,
	south: 52.354634,
	east: 13.822174
})
// .then(([remark]) => client.remark(remark.id))

.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
}, console.error)
