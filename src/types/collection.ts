import { Collection } from "../entities/Collection";

export type collectionInputDTO = {
    name: string
};

export type collectionImagesInputDTO = {
    id: string,
    images_id: string[]
};

export type collection = {
    id: string
    name?: string
};

export type id = {
    id: string
}