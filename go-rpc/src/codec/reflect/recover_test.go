package reflect_test

import (
	"fmt"
	"log"
	"math/rand"
	"testing"
	"time"
)

func TestRecover(t *testing.T) {

	log.Println("Start...")

	func() {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Runtime panic:", err)
			}
		}()
		r := rand.New(rand.NewSource(time.Now().UnixNano()))
		fmt.Println(float64(r.Intn(-1))) // Runtime panic
	}()

	log.Println("End...")
}
