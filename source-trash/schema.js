const schema = mongoose.Schema
const id = schema.ObjectId
var object = new schema({
	number: id,
	string: String,
	date: Date,
})
