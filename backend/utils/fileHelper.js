

export function extractFileUrlOrKey(file) {
	console.log(file);

	if (!file) throw new Error("File upload failed");

	const type = file.fieldname;

	console.log(type);

	if (["instructorPicture", "blogPicture", "courseThumbnail"].includes(type)) {
		return file.location;
	}

   if (["assignmentDoc", "resumes", "submissionDoc"].includes(type)) {
    return file.key;
  }

	throw new Error("Invalid file type");
}

