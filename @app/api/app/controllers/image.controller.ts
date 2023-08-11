import { Request, Response } from "express";
import { uploadImageToBucket, deleteImageFromBucket } from "../service/upload/s3.ts";
import Image from "../models/image.ts"

export default {
    async create(req: Request, res: Response) {
        const image = req.file

        const { key, link } = await uploadImageToBucket(image, { height: 100, width: 100 })

        const data = {
            link: link,
            key: key,
            width: 100,
            height: 100
        }

        const img = await Image.create(data)

        res.status(201).send(img)
    },
    async destroy(req: Request, res: Response) {
        const { imagekey } = req.params

        await deleteImageFromBucket(imagekey)

        const isDelete = await Image.destroy(imagekey)

        res.status(204).json(!!isDelete)
    }
}