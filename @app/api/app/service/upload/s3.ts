import ServerError from '../../helpers/errors/server.error.ts'
import logger from '../../helpers/logger.ts'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'

import resizeImage from '../../helpers/resize.image.ts'

const region = process.env.BUCKET_REGION
const bucketName = process.env.BUCKET_NAME
const accessKeyId = process.env.ACCESS_KEY_BUCKET
const secretAccessKey = process.env.ACCESS_SECRET_KEY_S3

if (!region) throw new ServerError('BUCKET_REGION env is not set')
if (!bucketName) throw new ServerError('BUCKET_NAME env is not set')
if (!accessKeyId) throw new ServerError('ACCESS_KEY_BUCKET env is not set')
if (!secretAccessKey) throw new ServerError('ACCESS_SECRET_KEY_S3 is not set')


const randomImageName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex')

const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region,
})

export async function uploadImageToBucket(file: any, { height, width }: { height: number, width: number }) {

    const resizeFileBuffer = await resizeImage(file.buffer, height, width)
    const imageKey = `${randomImageName()}_${file.originalName}_w${width}`

    const params = {
        Bucket: bucketName,
        Key: imageKey,
        Body: resizeFileBuffer,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params)

    await s3.send(command).catch((err) => {
        throw new ServerError('Upload to bucket has failed : ' + err.message)
    })

    const link = await getSignedUrl(s3, command)

    return {
        key: imageKey,
        link: link
    }
}

export async function deleteImageFromBucket(imageKey: string) {
    if (!bucketName) throw new ServerError('BUCKET_NAME env is not set')

    let params = {
        Bucket: bucketName,
        Key: imageKey
    }

    if (!params || !params.Key || !params.Bucket) throw new ServerError('Params is missing a key or a bucket name')

    try {
        await s3.send(new DeleteObjectCommand(params))
    } catch (error) {

        logger.error('Object have not been delete from bucket')
    }
}