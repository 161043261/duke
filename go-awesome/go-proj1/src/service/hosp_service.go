package service

import (
	"strconv"
	"sync"

	"bronya.com/go-proj1/src/dao"
	"bronya.com/go-proj1/src/data"
	"bronya.com/go-proj1/src/dto"
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

func (hospService *HospService) SelectHospByDistrictId(districtId uint) ([]data.Hosp, error) {
	return hospService.HospDao.SelectHospByDistrictId(districtId)
}

// func (hospService *HospService) InsertHosp(data data.Hosp) error {
//  return hospService.HospDao.InsertHosp(data)
// }

func (hospService *HospService) SelectAllHosp() ([]data.Hosp, error) {
	return hospService.HospDao.SelectAllHosp()
}

func (hospService *HospService) SelectAllLevel() ([]map[string]uint, error) {
	levels, err := hospService.HospDao.SelectAllLevel()
	if err != nil {
		return nil, err
	}
	var kvs []map[string]uint
	for _, level := range levels {
		kvs = append(kvs, map[string]uint{
			"id": level,
			// "level": levelName,
		})
	}
	return kvs, nil
}

func (hospService *HospService) SelectHospByCondPage(
	levelId uint, districtId uint, pageDto *dto.PageDto) (map[string]any, error) {
	hospArr, total, err := hospService.HospDao.SelectHospByCondPage(levelId, districtId, pageDto)
	if err != nil {
		return map[string]any{}, err
	}
	var kvs []map[string]string
	for _, hosp := range hospArr {
		kvs = append(kvs, map[string]string{
			"id":         strconv.Itoa(int(hosp.ID)),
			"hospCode":   hosp.HospCode,
			"hospName":   hosp.HospName,
			"level":      strconv.Itoa(int(hosp.LevelId)),
			"districtId": strconv.Itoa(int(hosp.DistrictId)),
			"logoData":   hosp.LogoData,
			"openTime":   hosp.OpenTime,
		})
	}

	// log.Println(kvs)

	return map[string]any{
		"content": kvs,
		"total":   total,
	}, nil
}

func (hospService *HospService) SelectHospLikeName(
	hospName string, pageDto *dto.PageDto) ([]data.Hosp, error) {
	return hospService.HospDao.SelectHospLikeName(hospName, pageDto)
}
