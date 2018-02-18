import __body_parser from 'body-parser'
import __dotenv from 'dotenv'
import __express from 'express'
import __mongoose from 'mongoose'
//
import _env from '../env'
//
const client = __mongoose.connect(
	'mongodb://'.concat(
		_env.DATABASE_USER + ':' + _env.DATABASE_PASS,
		'@',
		_env.DATABASE_HOST + ':' + _env.DATABASE_PORT,
		'/',
		_env.DATABASE_NAME,
	),
	callback,
)
//
export default (callback) => {
	return client
}
