package dao

import (
	"bronya.com/go-proj1/src/data"
	"bronya.com/go-proj1/src/global"
	"gorm.io/gorm"
	"sync"
)

type HospDao struct {
	db *gorm.DB
}

var hospDao *HospDao

func NewHospDao() *HospDao {
	once := sync.Once{}
	once.Do(func() {
		hospDao = &HospDao{
			db: global.Database,
		}
	})
	return hospDao
}

// SelectHospByDistrictCode
// ! 链式调用: Where, First
func (hospDao *HospDao) SelectHospByDistrictCode(districtCode string) (data.Hospital, error) {
	var hosp data.Hospital // receiver
	err := hospDao.db.Where("district_code = ?", districtCode).First(&hosp).Error
	return hosp, err
}

// InsertHosp
// ! 链式调用: Save
func (hospDao *HospDao) InsertHosp(hosp data.Hospital) error {
	//? Save is a combination function.
	//? If save value does not contain primary key, it will execute Create, otherwise it will execute Update (with all fields).
	//? Don’t use Save with Model, it’s an Undefined Behavior.
	err := hospDao.db.Save(&hosp).Error
	if err == nil {
		global.Logger.Info("Insert ok, hosp.ID =", hosp.ID)
	}
	return err
}

// SelectAllHosps
// ! 链式调用: Model, Find
func (hospDao *HospDao) SelectAllHosps() ([]data.Hospital, error) {
	var hosps []data.Hospital // receiver
	err := hospDao.db.Model(&data.Hospital{}).Find(&hosps).Error
	return hosps, err
}
