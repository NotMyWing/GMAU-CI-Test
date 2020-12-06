/**
 * Reads a stream into a buffer.
 * @param {Readable} stream The stream to read.
 */
function streamToBuffer(stream, callback) {
	let dataBuffer = [];

	function onData(data) {
		dataBuffer.push(data);
	}

	function onError(error) {
		callback(error);
		cleanup();
	}

	function onEnd() {
		callback(null, Buffer.concat(dataBuffer));
		cleanup();
	}

	function onClose() {
		callback(null, Buffer.concat(dataBuffer));
		cleanup();
	}

	function cleanup() {
		dataBuffer = [];
		stream.removeListener('data', onData);
		stream.removeListener('error', onError);
		stream.removeListener('end', onEnd);
		stream.removeListener('close', onClose);
	}

	stream.on('data', onData);
	stream.on('error', onError);
	stream.on('end', onEnd);
	stream.on('close', onClose);
}

exports.streamToBuffer = streamToBuffer;

/**
 * Checks if given environmental variables are set.
 * Throws when if a variable is unset.
 *
 * @param {string[]} vars
 * @throws
 */
checkEnvironmentalVariables = (vars) => {
	vars.forEach((vari) => {
		if (!process.env[vari] || process.env[vari] == "") {
			throw new Error(`Environmental variable ${vari} is unset.`);
		}
	});
}

exports.checkEnvironmentalVariables = checkEnvironmentalVariables;
