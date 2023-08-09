import sharp from 'sharp'

function resizeImage(buffer: Buffer, height: number, width: number) {
    const resizedBuffer = sharp(buffer).resize(
        {
            height,
            width
        }
    )
    return resizedBuffer
}

export default resizeImage