import File from "./file"

export default interface Series {
	directory: string
	fileName: string
	fileArray: File[]
	id: string
}
