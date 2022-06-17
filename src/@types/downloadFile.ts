import Series from "./series"

export type DownloadFile = ({}: Params) => Callback | void

interface Params {
	queue: Series[]
	retryInstance: number
}

type Callback = DownloadFile
