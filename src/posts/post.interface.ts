export interface post {
    title: string,
    body: string,
    description: string,
    thumbnail: {
        src: string,
        alt: string
    },
    views: Number,
    topic: string,
    publish: Boolean,
    tags: [string],
    author: [string]

}

export interface deleteStatus {
    msg: string,
    success: boolean
}