import File from "./file"

export type DownloadFile = ({}: Params) => Callback | void

interface Params {
	queue: File[]
	retryInstance: number
}

type Callback = DownloadFile
