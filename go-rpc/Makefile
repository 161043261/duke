.PHONY: install get

install:
	go install golang.org/x/tools/gopls@latest
	go install github.com/fatih/gomodifytags@latest
	go install github.com/josharian/impl@latest
	go install github.com/go-delve/delve/cmd/dlv@latest
	go install honnef.co/go/tools/cmd/staticcheck@latest

get:
	go get -u github.com/cweill/gotests@latest
	go get -u github.com/haya14busa/goplay@latest