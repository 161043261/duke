package dao

import (
	"bronya.com/go-proj1/src/data"
	"bronya.com/go-proj1/src/global"
	"gorm.io/gorm"
	"sync"
)

type DistrictDao struct {
	db *gorm.DB
}

var districtDao *DistrictDao

func NewDistrictDao() *DistrictDao {
	if districtDao != nil {
		return districtDao
	}
	once := sync.Once{}
	once.Do(func() {
		districtDao = &DistrictDao{
			db: global.Database,
		}
	})
	return districtDao
}

// SelectAllDistrict
// ! 链式调用: Model, Find
func (districtDao *DistrictDao) SelectAllDistrict() ([]string, error) {
	var districtArr []string
	err := districtDao.db.Model(&data.District{}).Select("district_name").Find(&districtArr).Error
	return districtArr, err
}

func (districtDao *DistrictDao) InsertDistrict(district data.District) error {
	// err := districtDao.db.Save(district).Error
	err := districtDao.db.Model(&data.District{}).Create(&district).Error
	if err != nil {
		global.Logger.Info("Primary Key:", district.ID)
	}
	return err
}
