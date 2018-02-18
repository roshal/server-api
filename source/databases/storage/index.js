import __mongodb from 'mongodb'
//
import _env from '../../env'
//
export default async (callback) => {
	let client
	try {
		client = await __mongodb.MongoClient.connect(
			[
				'mongodb://',
				_env.DATABASE_USER,
				':',
				_env.DATABASE_PASS,
				'@',
				_env.DATABASE_HOST,
				'?',
				_env.DATABASE_REST,
			].join(''),
		)
		const database = client.db(_env.DATABASE_NAME)
		await callback(database)
	} catch (error) {
		console.error(error)
	}
	if (client) {
		client.close((error) => {
			if (error) {
				throw err
			}
		})
	}
}
