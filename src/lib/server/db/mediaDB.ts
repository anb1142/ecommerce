import { IMG_KEY, IMG_NAME, IMG_SECRET } from '$env/static/private';
import { v2 as cloudinary, type UploadApiErrorResponse, type UploadApiResponse } from 'cloudinary';

cloudinary.config({
	cloud_name: IMG_NAME,
	api_key: IMG_KEY,
	api_secret: IMG_SECRET,
	secure: true
});
type IUploadMediaSuccess = {
	success: true;
	result: UploadApiResponse;
};
type IUploadMediaFailure = {
	success: false;
	error: UploadApiErrorResponse;
};
type IUploadMediaError = {
	success: false;
};
type IUploadMediaReturn = IUploadMediaSuccess | IUploadMediaFailure | IUploadMediaError;

// TODO: auth
const uploadMedia = async (
	media: File,
	name: string,
	folder = 'images'
): Promise<IUploadMediaReturn> => {
	const options = {
		file: media.name,
		display_name: name,
		unique_filename: true,
		folder
	};

	try {
		const arrayBuffer = await media.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		return new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(options, function onDone(error, result) {
					if (error) return reject({ success: false, error });
					if (!result) return reject({ success: false });
					return resolve({ success: true, result });
				})
				.end(buffer);
		});
	} catch (error) {
		console.error(error);
	}
	return { success: false };
};

export { uploadMedia };
