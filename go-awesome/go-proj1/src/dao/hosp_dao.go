package dao

import (
	"bronya.com/go-proj1/src/data"
	"bronya.com/go-proj1/src/global"
	"gorm.io/gorm"
	"log"
	"sync"
)

type HospDao struct {
	db *gorm.DB
}

// HospDao 单例
var hospDao *HospDao

func NewHospDao() *HospDao {
	if hospDao != nil {
		return hospDao
	}
	once := sync.Once{}
	once.Do(func() {
		hospDao = &HospDao{
			db: global.Database,
		}
	})
	return hospDao
}

// SelectHospByDistrictId
// ! 链式调用: Where, First
func (hospDao *HospDao) SelectHospByDistrictId(districtId string) (data.Hosp, error) {
	var hosp data.Hosp // receiver
	err := hospDao.db.Where("hosp_code = ?", districtId).First(&hosp).Error
	return hosp, err
}

// InsertHosp
// ! 链式调用: Save
func (hospDao *HospDao) InsertHosp(hosp data.Hosp) error {
	log.Printf("%#v\n", hosp)
	//? Save is a combination function.
	//? If save value does not contain primary key, it will execute Create, otherwise it will execute Update (with all fields).
	//? Don’t use Save with Model, it’s an Undefined Behavior.
	// err := hospDao.db.Save(&hosp).Error
	err := hospDao.db.Model(&data.Hosp{}).Create(&hosp).Error
	if err == nil {
		global.Logger.Info("Insert ok, hosp.ID =", hosp.ID)
	}
	return err
}

// SelectAllHosp
// ! 链式调用: Model, Find
func (hospDao *HospDao) SelectAllHosp() ([]data.Hosp, error) {
	var hospArr []data.Hosp // receiver
	err := hospDao.db.Model(&data.Hosp{}).Find(&hospArr).Error
	return hospArr, err
}

// SelectAllLevel
// ! 链式调用: Model, Find
func (hospDao *HospDao) SelectAllLevel() ([]string, error) {
	var levelArr []string
	// select distinct hosp_level from t_hosps;
	err := hospDao.db.Model(&data.Hosp{}).Select("hosp_level").Distinct("hosp_level").Find(&levelArr).Error
	return levelArr, err
}
