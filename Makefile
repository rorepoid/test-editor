.DEFAULT_GOAL:= dev

deps: # Install dependencies
	@npm install

dev: # Run development server
	@node --run dev
