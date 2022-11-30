install-locally:
	npm run build
	npm uninstall -g gitlab-env-generator
	npm install -g .
	gitlab-env-generator
