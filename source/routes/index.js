import __body_parser from 'body-parser'
//
const parser = __body_parser.json()
const _ = (server) => {
	const route = server.route('/')
	route.get(
		(request, response) => {
			response.send('hello world')
		},
	)
	route.post(
		parser,
		(request, response) => {
			const object = request.body
			response.json(object)
		},
	)
}
//
export default (server) => {
	_(server)
}
