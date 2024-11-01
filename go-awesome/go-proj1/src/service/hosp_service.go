package service

import (
	"bronya.com/go-proj1/src/dao"
	"sync"
)

type HospService struct {
	HospDao *dao.HospDao
}

// ! HospService 单例
var hospService *HospService

func NewHospService() *HospService {
	if hospService != nil {
		return hospService
	}
	once := sync.Once{}
	once.Do(func() {
		hospService = &HospService{
			HospDao: dao.NewHospDao(),
		}
	})
	return hospService
}

func (hospService *HospService) SelectAllLevel() ([]string, error) {
	return hospService.HospDao.SelectAllLevel()
}
