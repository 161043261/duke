package main

import "bronya.com/go-proj1/src/cmd"

func main() {
	defer cmd.Done()
	// cmd.Init("./")
	cmd.Init("../")
	cmd.Start()
}
