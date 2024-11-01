package data

import "gorm.io/gorm"

type District struct {
	gorm.Model
	DistrictName string `json:"districtName"` // district_name
}
