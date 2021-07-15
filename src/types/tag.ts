export type tagInputDTO = {
    name: string
};
export type imageTagsInputDTO = {
    tags: string[],
    author_id: string
};
export type tag = {
    id: string
    name?: string
};

export type ids = {
    id: string
}

export type tagsIds = ids[]