#!/usr/bin/env node
import * as fs from "fs"

const initializeProject = async () => {
	await fs.writeFile(
		"./queue.json",
		JSON.stringify({
			queue: [],
		}),
		(err) => {
			if (err) {
				console.error(err)
			} else if (process.env.NODE_ENV !== "test") {
				console.log("La lista de las descargas pendientes fue creada!")
			}
		}
	)

	await fs.writeFile(
		"./failedDownloads.json",
		JSON.stringify({
			failedDownloads: [],
		}),
		(err) => {
			if (err) {
				console.error(err)
			} else if (process.env.NODE_ENV !== "test") {
				console.log("La lista de las descargas pendientes fue creada!")
			}
		}
	)

	const env = `
probando=hola
    
otra=variable
    `

	await fs.writeFile("./.env", env, (err) => {
		if (err) {
			console.error(err)
		} else if (process.env.NODE_ENV !== "test") {
			console.log("El archivo .env fue creado!")
		}
	})
}

initializeProject()

export default initializeProject
