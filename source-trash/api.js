route = router.route('/get')
route.post(
	(request, response) => {
		const collection = database.collection('collection')
		const cursor = collection.find()
		cursor.toArray(
			(error, value) => {
				if (error) {
					throw error
				} else {
					response.json(value)
					console.log('get')
				}
			},
		)
	},
)
//
route = router.route('/set')
route.post(
	(request, response) => {
		const object = request.body
		const collection = database.collection('collection')
		collection.insert(
			object,
			(error, value) => {
				if (error) {
					throw error
				} else {
					response.json(value)
					console.log('set')
				}
			},
		)
	},
)
