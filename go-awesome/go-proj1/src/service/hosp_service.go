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

func (hospService *HospService) SelectAllLevel() ([]map[string]string, error) {
	levels, err := hospService.HospDao.SelectAllLevel()
	if err != nil {
		return nil, err
	}
	var kvs []map[string]string
	for _, level := range levels {
		kvs = append(kvs, map[string]string{
			"value": level,
		})
	}
	return kvs, nil
}

func (hospService *HospService) SelectHospByCondPage(level string, districtId uint, pageDto *dto.PageDto) (map[string]any, error) {
	hospArr, total, err := hospService.HospDao.SelectHospByCondPage(level, districtId, pageDto)
	if err != nil {
		return map[string]any{}, err
	}
	var hospContent []map[string]string
	for _, hosp := range hospArr {
		hospContent = append(hospContent, map[string]string{
			"id":         strconv.Itoa(int(hosp.ID)),
			"hospCode":   hosp.HospCode,
			"hospName":   hosp.HospName,
			"level":      hosp.Level,
			"districtId": strconv.Itoa(int(hosp.DistrictId)),
			"logoData":   hosp.LogoData,
			"openTime":   hosp.OpenTime,
		})
	}

	// log.Println(hospContent)

	return map[string]any{
		"content":   hospContent,
		"totalHosp": total,
	}, nil
}
