import __dotenv from 'dotenv'
//
const config = __dotenv.config()
const error = config.error
if (error) {
	throw error
}
const parsed = config.parsed
//
export default parsed
