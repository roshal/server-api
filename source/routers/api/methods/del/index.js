import _databases__storage from '../../../../databases/storage'
//
export default (data, response) => {
	_databases__storage(async (database) => {
		const collection = database.collection('collection')
		await collection.drop(
			(error, object) => {
				if (error) {
					throw error
				} else {
					response.json({
						data: object,
					})
				}
			},
		)
	})
}
