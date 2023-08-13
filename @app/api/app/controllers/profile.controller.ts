import { Request, Response } from 'express';
import Profile from '../models/profile.ts';
import Image from '../models/image.ts';
import { uploadImageToBucket } from '../service/upload/s3.ts';


export default {
    async getAll(_req: Request, res: Response) {
        const userProfiles = await Profile.findAll()

        res.status(200).json(userProfiles)

    },
    async getOne(req: Request, res: Response) {
        const { id } = req.params

        const userProfile = await Profile.findOrCreate(id)

        res.status(200).json(userProfile)
    },
    async create(req: Request, res: Response) {
        const profileData = req.body

        const profile = await Profile.create(profileData)

        res.status(201).send(profile)
    },
    async update(req: Request, res: Response) {
        const profileData = req.body

        const profile = await Profile.update(profileData)

        res.status(200).send(profile)
    },
    async addAvatar(req: Request, res: Response) {
        const avatar = req.file
        const { user_id } = req.body

        const { key, link } = await uploadImageToBucket(avatar, { height: 100, width: 100 })

        const data = {
            link: link,
            key: key,
            width: 100,
            height: 100
        }

        const img = await Image.create(data)

        const profile = await Profile.avatar(user_id, img.id)

        res.status(201).send(profile)
    }
}