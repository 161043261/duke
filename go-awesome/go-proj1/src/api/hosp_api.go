package api

import (
	"sync"

	"bronya.com/go-proj1/src/dto"
	"bronya.com/go-proj1/src/global"
	"bronya.com/go-proj1/src/service"
	"github.com/gin-gonic/gin"
)

type HospApi struct {
	HospService *service.HospService
}

var hospApi *HospApi

func NewHospApi() *HospApi {
	if hospApi != nil {
		return hospApi
	}
	once := sync.Once{}
	once.Do(func() {
		hospApi = &HospApi{
			HospService: service.NewHospService(),
		}
	})
	return hospApi
}

// SelectHospById
// /hosp/${hospCode}
// TODO
func (hostApi HospApi) SelectHospById() {

}

// SelectHospLikeName
// /hosp/likeName/${hospName}
// TODO
func (hostApi HospApi) SelectHospLikeName() {

}

// SelectHospByCondPage
// /hosp/page/${curr}/${limit}?level=${level}&districtId=${districtId}
// level: string, districtId: number
func (hostApi HospApi) SelectHospByCondPage(ctx *gin.Context) {
	var pageDto dto.PageDto
	validationErrs := ctx.ShouldBindUri(&pageDto)

	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		RespErr(ctx, Resp{
			Message: validationErrs.Error(),
		})
		return
	}
	global.Logger.Debugf("%#v", pageDto)
	data, err := hospApi.HospService.SelectHospByCondPage(&pageDto)
	if err != nil {
		global.Logger.Errorln(err.Error())
		RespErr(ctx, Resp{
			Message: err.Error(),
		})
		return
	}

	RespOk(ctx, Resp{
		Data: data,
	})
}

func (hostApi HospApi) SelectLevelOrDistrict(ctx *gin.Context) {
	mode := ctx.Param("mode")
	global.Logger.Debugln("mode:", mode)
	switch mode {

	case "level":
		kvs, _ := hospApi.HospService.SelectAllLevel()
		// global.Logger.Debugln(levelArr)
		RespOk(ctx, Resp{
			Data: kvs,
		})

	case "district":
		kvs, _ := NewDistrictApi().districtService.SelectAllDistrict()
		// global.Logger.Debugln(districtArr)
		RespOk(ctx, Resp{
			Data: kvs,
		})

	default:
		RespErr(ctx, Resp{
			Message: "Unsupported Mode",
		})
	}
}
