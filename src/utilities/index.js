import { v4 as uuid } from "uuid";
import { bucket } from "../utilities/config.js";
import { AuthenticationError } from "apollo-server-express";

export const checkFileSize = (createReadStream, maxSize) => {
	new Promise((resolve, reject) => {
		let fileSize = 0;
		const stream = createReadStream();
		stream.on("data", (chunk) => {
			fileSize += chunk.length;
			if (fileSize > maxSize) {
				rejects(filesize);
			}
		});

		stream.on("end", () => {
			resolve(fileSize);
		});
		stream.on("error", reject);
	});
};

export const generateUniqueFilename = (fileName) => {
	const trimmedFilename = fileName.replace(/\s+/g, `-`);
	const unique = uuid();
	return `${unique}-${trimmedFilename}`;
};

export const uploadToGoogleCloud = (createReadStream, filename) => {
	return new Promise((resolve, reject) =>
		createReadStream()
			.pipe(
				bucket.file(filename).createWriteStream({
					resumable: false,
					gzip: true,
				})
			)
			.on("error", (err) => rejects(err))
			.on("finish", resolve())
	);
};

export const assertAuthenticated = (context) => {
    if (!context.user && context.status == 401) {
		throw new AuthenticationError(context.message);
	}else if (!context.user){
        throw new AuthenticationError("Token not provided");
    }
};
