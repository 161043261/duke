package data

import (
	"bronya.com/go-proj1/src/global"
	"gorm.io/gorm"
)

type Hosp struct {
	gorm.Model
	HospCode   string `json:"hospCode"`
	HospName   string `json:"hospName"`
	Level      string `json:"level"`
	LogoData   string `json:"logoData"`
	DistrictId uint   `json:"districtId"`
	OpenTime   string `json:"openTime"`
}

// BeforeCreate GORM 钩子函数
func (hosp *Hosp) BeforeCreate(db *gorm.DB) error {
	global.Logger.Info("Gorm hook")
	return nil
}
