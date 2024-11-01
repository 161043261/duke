package api

import (
	"bronya.com/go-proj1/src/service"
	"sync"
)

type DistrictApi struct {
	districtService *service.DistrictService
}

var districtApi *DistrictApi

func NewDistrictApi() *DistrictApi {
	if districtApi != nil {
		return districtApi
	}
	once := sync.Once{}
	once.Do(func() {
		districtApi = &DistrictApi{
			districtService: service.NewDistrictService(),
		}
	})
	return districtApi
}
