import __express from 'express'
//
import _env from './env'
import _routers__api from './routers/api'
import _routes from './routes'
//
const port = _env.PORT || 80
const server = __express()
_routes(server)
server.use('/api', _routers__api)
server.listen(
	port,
	() => {
		console.log('server listening on port', port)
	},
)
