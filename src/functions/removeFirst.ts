import File from "../@types/file"

const removeFirst: RemoveFirst = (arr) => {
	const updatedArr: File[] = []

	if (arr.length === 0) {
		return {
			updatedArr: [],
			firstElement: undefined,
		}
	}

	arr.forEach((e, i) => {
		if (i >= 1) {
			updatedArr.push(e)
		}
	})

	return {
		updatedArr,
		firstElement: arr[0],
	}
}

type RemoveFirst = (arr: File[]) => { updatedArr: File[]; firstElement: File | undefined }

export default removeFirst
