

export function extractFileUrlOrKey(file) {
	console.log(file);
	if (!file) throw new Error("File upload failed");

	const type = file.fieldname;

	if (["instructorPicture", "blogPicture", "courseThumbnail"].includes(type)) {
		return file.location;
	}

	if (["assignmentDoc", "resumes"].includes(type)) {
		return file.key;
	}

	throw new Error("Invalid file type");
}

