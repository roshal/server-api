import __mongodb from 'mongodb'
//
import _env from '../../env'
//
export default (callback) => {
	__mongodb.MongoClient.connect(
		'mongodb://'.concat(
			_env.DATABASE_USER, ':', _env.DATABASE_PASS,
			'@',
			_env.DATABASE_HOST, '/', _env.DATABASE_NAME,
			'?',
			_env.DATABASE_REST,
		),
		(error, client) => {
			if (error) {
				console.error(error)
			} else {
				const database = client.db(_env.DATABASE_NAME)
				callback(database)
				client.close((error) => {
					if (error) {
						throw err
					}
				})
			}
		},
	)
}
