import __body_parser from 'body-parser'
import __express from 'express'
//
import _methods__del from './methods/del'
import _methods__get from './methods/get'
import _methods__set from './methods/set'
//
const parser = __body_parser.json()
const router = __express.Router()
router.use(parser)
const route = router.route('/')
route.post(
	(request, response) => {
		const object = request.body
		switch (object.method) {
			case 'set': {
				_methods__set(object.data, response)
			} break
			case 'get': {
				_methods__get(object.data, response)
			} break
			case 'del': {
				_methods__del(object.data, response)
			} break
			default: {
				response.json({
					error: {
						message: 'method is undefined',
					},
				})
			}
		}
	},
)
//
export default router
