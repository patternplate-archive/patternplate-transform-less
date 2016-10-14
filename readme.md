# patternplate-transform-less
[patternplate](/sinnerschrader/patternplate) patternplate transform creating css from less sources

## Installation
```shell
npm install --save patternplate-transform-less
```

## Configuration

Tell patternplate to load the `less` transform

```js
// configuration/patternplate-server/transforms.js
module.exports = {
	less: {
		inFormat: 'less',
		outFormat: 'css',
		opts: {
			// pass less options here.
		}
	}
};
```

Use the configured transform for pattern format transformation

```js
// configuration/patternplate-server/patterns.js
module.exports = {
	formats: {
		less: {
			transforms: ['less']
		}
	}
};
```

### Less plugins

Install less plugins separately and configure them in the less transform options under the plugins key:

```
npm install --save less-plugin-autoprefix
```

```js
// configuration/patternplate-server/transforms.js
module.exports = {
	less: {
		inFormat: 'less',
		outFormat: 'css',
		plugins: {
			autoprefix: {
				enabled: true // load less-plugin-autoprefix,
				opts: { // pass .opts as options into the plugin constructor
					browsers: ['last 2 version']
				}
			}
		}
	}
};
```


## See also

* [patternplate](https://github.com/sinnerschrader/patternplate) - Create, show and deliver component libraries
* [transform-sass](https://github.com/sinnerschrader/patternplate-transform-sass) - Process SASS to CSS
* [transform-postcss](https://github.com/sinnerschrader/patternplate-transform-postcss) - Process CSS via PostCSS

---
Copyright 2016 by [SinnerSchrader Deutschland GmbH](https://github.com/sinnerschrader) and [contributors](./graphs/contributors). Released under the [MIT license]('./license.md').
