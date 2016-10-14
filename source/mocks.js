import {merge} from 'lodash/fp';

const file = {
	path: 'mocks/test/index.less',
	pattern: {
		id: 'test'
	},
	dependencies: {}
};

const getFile = merge(file);

export const application = {
	configuration: {
		transforms: {
		}
	},
	cache: {
		get() {
			return null;
		},
		set() {
			return null;
		}
	},
	log: {
		warn() {
		}
	},
	runtime: {
		patterncwd: process.cwd()
	}
};

export const emptyFile = getFile({
	buffer: new Buffer('')
});

export const simpleFile = getFile({
	path: 'mocks/simple/index.less',
	buffer: new Buffer('@red: red; .foo { color: @red; }')
});

export const dependentFile = getFile({
	path: 'mocks/dependent/index.less',
	buffer: new Buffer('@import "simple"; @green: green; .bar { color: @green; }'),
	dependencies: {
		simple: simpleFile
	}
});

export const missingDependenciesFile = getFile({
	path: 'mocks/missing/index.less',
	buffer: new Buffer('@import "simple"; @green: green; .bar { color: @green; }'),
	dependencies: {}
});

export const transitiveFile = getFile({
	path: 'mocks/transitive/index.less',
	buffer: new Buffer('@import "dependent"; @blue: blue; .baz { color: @blue; }'),
	dependencies: {
		dependent: dependentFile
	}
});

export const invalidTransitiveFile = getFile({
	path: 'mocks/invalid-transitive/index.less',
	buffer: new Buffer('@import "simple";'),
	dependencies: {
		dependent: dependentFile
	}
});
