package dao

import (
	"bronya.com/go-proj1/src/dto"
	"gorm.io/gorm"
)

// PageFunc 分页函数
type PageFunc func(*gorm.DB) *gorm.DB

// GetPageFunc 获取分页函数
func GetPageFunc(pageDto *dto.PageDto) PageFunc {
	return func(db *gorm.DB) *gorm.DB {
		return db.Offset((pageDto.GetCurrPage() - 1) * pageDto.Limit).Limit(pageDto.GetSizeLimit())
	}
}
