package data

import (
	"bronya.com/go-proj1/src/global"
	"gorm.io/gorm"
)

type Hospital struct {
	gorm.Model
	HospCode    string `json:"hospCode"`
	HospName    string `json:"hospName"`
	HospLevel   string `json:"hospLevel"`
	LogoData    string `json:"logoData"`
	ReleaseTime string `json:"releaseTime"`
}

// BeforeCreate GORM 钩子函数
func (hosp *Hospital) BeforeCreate(db *gorm.DB) error {
	global.Logger.Info("Gorm hook")
	return nil
}
