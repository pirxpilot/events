check: lint test

lint:
	./node_modules/.bin/jshint *.js test

test:
	node --require should --require jsdom-global/register --test

.PHONY: check lint test
