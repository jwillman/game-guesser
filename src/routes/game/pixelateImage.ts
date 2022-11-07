export function pixelateImage({
	originalImageUrl,
	pixelatedImage,
	pixelationFactor
}: {
	originalImageUrl: string;
	pixelatedImage: HTMLImageElement | null;
	pixelationFactor: number;
}): void {
	if (originalImageUrl == null || pixelatedImage == null) {
		return;
	}

	const sourceImage = new Image();
	sourceImage.src = originalImageUrl;

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	if (context == null) {
		throw new Error("Couldn't get context");
	}

	const originalWidth = sourceImage.width;
	const originalHeight = sourceImage.height;

	const canvasWidth = originalWidth;
	const canvasHeight = originalHeight;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	context.drawImage(sourceImage, 0, 0, originalWidth, originalHeight);

	const originalImageData = context.getImageData(0, 0, originalWidth, originalHeight).data;

	if (pixelationFactor !== 0) {
		for (let y = 0; y < originalHeight; y += pixelationFactor) {
			for (let x = 0; x < originalWidth; x += pixelationFactor) {
				// extracting the position of the sample pixel
				const pixelIndexPosition = (x + y * originalWidth) * 4;

				// drawing a square replacing the current pixels
				context.fillStyle = `rgba(
                    ${originalImageData[pixelIndexPosition]},
                    ${originalImageData[pixelIndexPosition + 1]},
                    ${originalImageData[pixelIndexPosition + 2]},
                    ${originalImageData[pixelIndexPosition + 3]}
                )`;
				context.fillRect(x, y, pixelationFactor, pixelationFactor);
			}
		}
	}

	pixelatedImage.src = canvas.toDataURL();
}
