package dto

import "github.com/spf13/viper"

// PageDto
// Curr current page 当前页号, 从 1 开始, 默认 1
// Limit size limit 每页记录数, 默认 10
type PageDto struct {
	// * offset = (curr - 1) * offset
	Curr  int `json:"curr,omitempty" form:"curr" uri:"curr"`
	Limit int `json:"limit,omitempty" form:"limit" uri:"limit"`
}

func (pageDto *PageDto) GetCurrPage() int {
	if pageDto.Curr <= 0 {
		pageDto.Curr = viper.GetInt("db.page.curr")
	}
	return pageDto.Curr
}

func (pageDto *PageDto) GetSizeLimit() int {
	if pageDto.Limit <= 0 {
		pageDto.Limit = viper.GetInt("db.page.limit")
	}
	return pageDto.Limit
}
