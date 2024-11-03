package api

import (
	"strconv"
	"sync"

	"bronya.com/go-proj1/src/dto"
	"bronya.com/go-proj1/src/global"
	"bronya.com/go-proj1/src/service"
	"github.com/gin-gonic/gin"
)

// 总结
// 1. ? 查询参数: value := ctx.Query("key")
// 2. URI 路径参数: value := ctx.Param("key"); ctx.ShouldBindUri(&value);

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
func (hostApi HospApi) SelectHospLikeName(ctx *gin.Context) {
	// CurrPage: 1, SizeLimit: 10
	pageDto := dto.PageDto{
		Curr:  1,
		Limit: 8,
	}
	hospName := ctx.Param("hospName")
	hospArr, err := hospApi.HospService.SelectHospLikeName(hospName, &pageDto)
	if err != nil {
		global.Logger.Errorln(err.Error())
		RespErr(ctx, Resp{Message: err.Error()})
		return
	}
	RespOk(ctx, Resp{Data: hospArr})
}

// SelectHospByCondPage
// /hosp/condPage/${curr}/${limit}?levelId=${levelId}&districtId=${districtId}
func (hostApi HospApi) SelectHospByCondPage(ctx *gin.Context) {
	var pageDto dto.PageDto
	validationErrs := ctx.ShouldBindUri(&pageDto)

	levelStr := ctx.Query("levelId")
	levelId, _ := strconv.Atoi(levelStr)

	districtStr := ctx.Query("districtId")
	districtId, _ := strconv.Atoi(districtStr)

	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		RespErr(ctx, Resp{Message: validationErrs.Error()})
		return
	}

	// log.Println("level:", level, "districtId:", districtId)

	data, err := hospApi.HospService.SelectHospByCondPage(uint(levelId), uint(districtId), &pageDto)
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
