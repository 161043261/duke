package service

import (
	"bronya.com/go-proj1/src/dao"
	"strconv"
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

func (districtService *DistrictService) SelectAllDistrict() ([]map[string]string, error) {
	// kvs: Key-Value (s) Slice
	var kvs []map[string]string
	districts, err := districtService.DistrictDao.SelectAllDistrict()
	if err != nil {
		return nil, err
	}

	for _, district := range districts {
		kvs = append(kvs, map[string]string{
			"id":    strconv.Itoa(int(district.ID)),
			"value": district.DistrictName,
		})
	}
	return kvs, nil
}
