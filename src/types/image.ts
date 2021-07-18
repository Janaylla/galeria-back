export type imageInputDTO = {
	subtitle: string,
	file: string,
	tags: string[],
	collections: string[]
}
export type ImageTagInputDTO = {
	image_id: string,
	tag_id: string 
}
export type ImageCollectionInputDTO = {
	image_id: string,
	collection_id: string 
}
export type imageDelInputDTO = {
	id: string
}
export type getByIdInputDTO = {
	id: string
}

export type getByCollectionIdInputDTO = {
	id: string
}