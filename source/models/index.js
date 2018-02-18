import __mongoose from 'mongoose'
//
__mongoose.connect(
	'mongodb://'.concat(
		_env.DATABASE_USER, ':', _env.DATABASE_PASS,
		'@',
		_env.DATABASE_HOST, '/', _env.DATABASE_NAME,
		'?',
		_env.DATABASE_REST,
	),
	{
		'server': {
			'socketOptions': {
				'keepAlive': 300000,
				'connectTimeoutMS': 30000,
			},
		},
		'replset': {
			'socketOptions': {
				'keepAlive': 300000,
				'connectTimeoutMS': 30000,
			},
		},
	}
)
const database = mongoose.connection
database.on(
	'error',
	(error) => {
		if (error) {
			throw error
		}
	},
)
database.once(
	'open',
	() => {
		// create song schema
		let songSchema = mongoose.Schema({
			decade: String,
			artist: String,
			song: String,
			weeksAtOne: Number,
		})
		// store song documents in a collection called "songs"
		let Song = mongoose.model('songs', songSchema)
		// create seed data
		let seventies = new Song({
			decade: '1970s',
			artist: 'Debby Boone',
			song: 'You Light Up My Life',
			weeksAtOne: 10,
		})
		let eighties = new Song({
			decade: '1980s',
			artist: 'Olivia Newton-John',
			song: 'Physical',
			weeksAtOne: 10,
		})
		let nineties = new Song({
			decade: '1990s',
			artist: 'Mariah Carey',
			song: 'One Sweet Day',
			weeksAtOne: 16,
		})
		// first we'll add a few songs. Nothing is required to create the songs collection it is created automatically when we insert
		let list = [seventies, eighties, nineties]
		Song.insertMany(list).then(() => {
			// then we need to give Boyz II Men credit for their contribution to the hit "One Sweet Day"
			return Song.update({ song: 'One Sweet Day'}, { $set: { artist: 'Mariah Carey ft. Boyz II Men'} })
		}).then(() => {
			// finally we run a query which returns all the hits that spend 10 or more weeks at number 1
			return Song.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1})
		}).then(docs => {
			docs.forEach(doc => {
				console.log(
					'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
					' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
				)
			})
		}).then(() => {
			// since this is an example - we will clean up after ourselves
			return mongoose.connection.db.collection('songs').drop()
		}).then(() => {
			// only close the connection when your app is terminating
			return mongoose.connection.close()
		}).catch((error) => {
			// log any errors that are thrown in the Promise chain
			console.log(error)
		})
	},
)
