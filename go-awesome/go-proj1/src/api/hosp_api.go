package api

import (
	"strconv"
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
		hospApi = &HospApi{HospService: service.NewHospService()}
	})
	return hospApi
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
	level := ctx.Query("level")
	districtIdStr := ctx.Query("districtId")
	districtId, _ := strconv.Atoi(districtIdStr)

	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		RespErr(ctx, Resp{Message: validationErrs.Error()})
		return
	}

	// log.Println("level:", level, "districtId:", districtId)

	data, err := hospApi.HospService.SelectHospByCondPage(level, uint(districtId), &pageDto)
	if err != nil {
		global.Logger.Errorln(err.Error())
		RespErr(ctx, Resp{Message: err.Error()})
		return
	}
	RespOk(ctx, Resp{Data: data})
}

func (hostApi HospApi) SelectLevelOrDistrict(ctx *gin.Context) {
	mode := ctx.Param("mode")
	global.Logger.Debugln("mode:", mode)
	switch mode {

	case "level":
		kvs, _ := hospApi.HospService.SelectAllLevel()
		// global.Logger.Debugln(levelArr)
		RespOk(ctx, Resp{Data: kvs})

	case "district":
		kvs, _ := NewDistrictApi().districtService.SelectAllDistrict()
		// global.Logger.Debugln(districtArr)
		RespOk(ctx, Resp{Data: kvs})

	default:
		RespErr(ctx, Resp{Message: "Unsupported Mode"})
	}
}
