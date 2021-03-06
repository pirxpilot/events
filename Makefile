check: lint test

lint:
	./node_modules/.bin/jshint *.js test

test:
	./node_modules/.bin/mocha --recursive --require should --require jsdom-global/register

.PHONY: check lint test
