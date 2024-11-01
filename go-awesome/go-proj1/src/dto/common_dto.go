package dto

import "github.com/spf13/viper"

type PageDto struct {
	//* offset = (curr - 1) * offset
	Curr  int `json:"curr,omitempty" form:"curr" uri:"curr"`    //! 当前页号, 从 1 开始, 默认 1
	Limit int `json:"limit,omitempty" form:"limit" uri:"limit"` //! 每页记录数, 默认 10
}

func (pageDto *PageDto) GetPage() int {
	if pageDto.Curr <= 0 {
		pageDto.Curr = viper.GetInt("db.page.curr")
	}
	return pageDto.Curr
}

func (pageDto *PageDto) GetLimit() int {
	if pageDto.Limit <= 0 {
		pageDto.Limit = viper.GetInt("db.page.limit")
	}
	return pageDto.Limit
}
