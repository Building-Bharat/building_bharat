exports.extractFileUrlOrKey(req) = function () {
	if (!req.file) throw new Error("File upload failed");

	const { type } = req.body;

	if (["instructorPicture", "blogPicture", "courseThumbnail"].includes(type)) {
		return req.file.location;
	}

	if (["assignmentDoc", "resumes"].includes(type)) {
		return req.file.key;
	}

	throw new Error("Invalid file type");
}


