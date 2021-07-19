# galeria-back

Endpoints: 

POST https://galeria-janaylla.herokuapp.com/users/signup 
Content-Type: application/json

{
	"name": "Teste",
	"email": "Teste@gmail.com",
	"nickname": "Teste",
	"password": "asdasd"
}

###
POST http://localhost:3003/users/login 
Content-Type: application/json

{
	"login": "Teste@gmail.com",
	"password": "asdasd"
}

###
POST http://localhost:3003/users/login 
Content-Type: application/json

{
	"login": "janaylla@gmail.com",
	"nickname": "jana",
	"password": "123456"
}


###
POST http://localhost:3003/tags 
Content-Type: application/json

{
	"name": "verão"
}

###
POST http://localhost:3003/collection 
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNTk0MzI0NywiZXhwIjoxNjI2MDI5NjQ3fQ.WpEYqB2j_F28KbiLFQEJueX1vaQmZBvdUT235zTAD2Q

{
	"name": "verão"
}


###
GET http://localhost:3003/collections 
Content-Type: application/json
###
GET http://localhost:3003/tags 
Content-Type: application/json

###
POST http://localhost:3003/images 
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjU1OTU0OCwiZXhwIjoxNjI2NjQ1OTQ4fQ.cOPaSJ-81VDoEltWf4K7-oHfhD24CUyE6vSd3bfBzRM

{
	"subtitle": "AAAAAAAAAAAAAaa",
	"file": "string",
	"tags": [
		"9b116fdc-38bb-4661-a7aa-af279eb10608",
		"9155ad07-ef11-4e38-a03c-e3bc6c057d75"
	],
	"collections":
	[
		"c633b18b-6c33-462f-8582-b4abbf29b094"
	]
}
###
PUT http://localhost:3003/collections/040ab732-ce51-42db-a57a-acc3574588bf/images 
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjY1NDA1NCwiZXhwIjoxNjI2ODI2ODU0fQ.g8Eyekd_i9WYcNDJy_s-eFh5kb-ChpVKdVbbPwzLohU

{
	"images": [
		"1388afac-450b-43ab-8bf9-adca18d4cf5c",
		"240a234f-cc1a-4986-a718-3bee1daa353f"
	]
}

###
GET http://localhost:3003/images/1388afac-450b-43ab-8bf9-adca18d4cf5c
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjQ3ODcxMywiZXhwIjoxNjI2NTY1MTEzfQ.E2XqlUVnnRfE6YhsUVXj_Gqduo26wXMHlyMTDHzHiRk

###
GET http://localhost:3003/images/240a234f-cc1a-4986-a718-3bee1daa353f
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjQ3ODcxMywiZXhwIjoxNjI2NTY1MTEzfQ.E2XqlUVnnRfE6YhsUVXj_Gqduo26wXMHlyMTDHzHiRk

###
GET http://localhost:3003/images/collection/c633b18b-6c33-462f-8582-b4abbf29b094
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjU2OTk0NiwiZXhwIjoxNjI2NjU2MzQ2fQ.y-s821Gu0T5nc6TXv_D8M2oDd_WeuEnKDm6cRMYD-5E

###
GET  http://localhost:3003/images
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjIyMDA0OCwiZXhwIjoxNjI2MzA2NDQ4fQ.fdxeLdQ7VYM-4jL5ssKeIp18W1C_dH78iPv8xPc9Kkk

###
GET  http://localhost:3003/images
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjIyMDA0OCwiZXhwIjoxNjI2MzA2NDQ4fQ.fdxeLdQ7VYM-4jL5ssKeIp18W1C_dH78iPv8xPc9Kkk
###

GET  http://localhost:3003/images/tag
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjIyMDA0OCwiZXhwIjoxNjI2MzA2NDQ4fQ.fdxeLdQ7VYM-4jL5ssKeIp18W1C_dH78iPv8xPc9Kkk

###
DELETE  http://localhost:3003/images/240a234f-cc1a-4986-a718-3bee1daa353f/tag/9155ad07-ef11-4e38-a03c-e3bc6c057d75
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjIyMDA0OCwiZXhwIjoxNjI2MzA2NDQ4fQ.fdxeLdQ7VYM-4jL5ssKeIp18W1C_dH78iPv8xPc9Kkk

###
PUT http://localhost:3003/images/240a234f-cc1a-4986-a718-3bee1daa353f/tag/9155ad07-ef11-4e38-a03c-e3bc6c057d75
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjIyMDA0OCwiZXhwIjoxNjI2MzA2NDQ4fQ.fdxeLdQ7VYM-4jL5ssKeIp18W1C_dH78iPv8xPc9Kkk


###
DELETE  http://localhost:3003/images/240a234f-cc1a-4986-a718-3bee1daa353f/collection/c633b18b-6c33-462f-8582-b4abbf29b094
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjIyMDA0OCwiZXhwIjoxNjI2MzA2NDQ4fQ.fdxeLdQ7VYM-4jL5ssKeIp18W1C_dH78iPv8xPc9Kkk

###
PUT http://localhost:3003/images/240a234f-cc1a-4986-a718-3bee1daa353f/collection/c633b18b-6c33-462f-8582-b4abbf29b094
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYjZiOWRkLWJiNzItNDZhZS04ZjQwLWNhZDE5Y2EzYzQ2NyIsImlhdCI6MTYyNjIyMDA0OCwiZXhwIjoxNjI2MzA2NDQ4fQ.fdxeLdQ7VYM-4jL5ssKeIp18W1C_dH78iPv8xPc9Kkk
