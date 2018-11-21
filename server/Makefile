IMAGE=ryanblunden/dockerfilelintserver
VERSION=0.0.1

build:
	docker image build -t $(IMAGE):$(VERSION) -t $(IMAGE):latest .

run:
	docker container run --rm -v $(CURDIR):/usr/src/app $(IMAGE):latest $(CMD)

dev:
	docker container run -e FLASK_DEBUG=1 -e PYTHONUNBUFFERED=1 --rm -p 5000:5000 -v $(CURDIR):/usr/src/app $(IMAGE):latest $(CMD)

lint:
	"$(MAKE)" run CMD="flake8 ./ \
    --exclude=migrations,.git,static,data,fixtures,*.json,templates \
    --max-complexity 12 \
    --ignore=E501"

test:
	"$(MAKE)" run CMD="py.test -x -s --color=yes"

push:
	docker image push $(IMAGE):$(VERSION)
	docker image push $(IMAGE):latest
