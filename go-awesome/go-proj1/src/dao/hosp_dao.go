package dao

import (
	"bronya.com/go-proj1/src/data"
	"bronya.com/go-proj1/src/dto"
	"bronya.com/go-proj1/src/global"
	"gorm.io/gorm"
	"sort"
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
func (hospDao *HospDao) SelectHospByDistrictId(districtId uint) ([]data.Hosp, error) {
	var hospArr []data.Hosp // receiver
	err := hospDao.db.Where("district_id = ?", districtId).Find(&hospArr).Error
	return hospArr, err
}

// InsertHosp
// ! 链式调用: Save
func (hospDao *HospDao) InsertHosp(hosp data.Hosp) error {
	global.Logger.Debugf("%#v\n", hosp)
	// ? Save is a combination function.
	// ? If save value does not contain primary key, it will execute Create, otherwise it will execute Update (with all fields).
	// ? Don’t use Save with Model, it’s an Undefined Behavior.
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
	err := hospDao.db.Model(&data.Hosp{}).Select("level").Distinct("level").Find(&levelArr).Error
	sort.Strings(levelArr)
	return levelArr, err
}

func (hospDao *HospDao) SelectHospByCondPage(level string, districtId uint, pageDto *dto.PageDto) ([]data.Hosp, int64, error) {
	var hospArr []data.Hosp // ! 接收分页查询结果
	var total int64         // ! 接收总记录数
	tx := hospDao.db.Model(&data.Hosp{})
	if level != "" {
		// 条件查询
		tx = tx.Where("level = ?", level)
	}
	if districtId > 0 {
		tx = tx.Where("district_id = ?", districtId)
	}
  tx = tx.Find(&hospArr)

	// 分页查询
	err := tx.Scopes(GetPageFunc(pageDto)). // ! 传递分页函数
						Find(&hospArr).       // ! 分页查询
						Offset(-1).Limit(-1). // ! 取消分页查询条件
						Count(&total).Error   // ! 总记录数
	return hospArr, total, err
}
