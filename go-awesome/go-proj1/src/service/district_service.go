package service

import (
	"bronya.com/go-proj1/src/dao"
	"sync"
)

type DistrictService struct {
	DistrictDao *dao.DistrictDao
}

// ! DistrictService 单例
var districtService *DistrictService

func NewDistrictService() *DistrictService {
	if districtService != nil {
		return districtService
	}
	once := sync.Once{}
	once.Do(func() {
		districtService = &DistrictService{
			DistrictDao: dao.NewDistrictDao(),
		}
	})
	return districtService
}

func (districtService *DistrictService) SelectAllDistrict() ([]string, error) {
	return districtService.DistrictDao.SelectAllDistrict()
}
