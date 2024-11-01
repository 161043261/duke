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

// SelectHospByCode
// /hosp/${hospCode}
// TODO
func (hostApi *HospApi) SelectHospByCode() {

}

// SelectHospLikeName
// /hosp/likeName/${hospName}
// TODO
func (hostApi *HospApi) SelectHospLikeName() {
}

// SelectHospByPage
// /hosp/page/${curr}/${limit}?level=${level}&districtId=${districtId}
// TODO
func (hostApi *HospApi) SelectHospByPage(ctx *gin.Context) {
	var pageDto dto.PageDto
	validationErrs := ctx.ShouldBindUri(&pageDto)
	if validationErrs != nil {
		global.Logger.Errorln(validationErrs.Error())
		Err(ctx, Resp{
			Message: validationErrs.Error(),
		})
		return
	}
	global.Logger.Debugf("%#v", pageDto)
}

func (hostApi *HospApi) SelectLevelOrDistrict(ctx *gin.Context) {
	mode := ctx.Param("mode")
	global.Logger.Debugln("mode:", mode)
	switch mode {
	case "level":
		levelArr, _ := hospApi.HospService.SelectAllLevel()
		global.Logger.Debugln(levelArr)
		Ok(ctx, Resp{
			Data: levelArr,
		})
	case "district":
		districtArr, _ := NewDistrictApi().districtService.SelectAllDistrict()
		global.Logger.Debugln(districtArr)
		Ok(ctx, Resp{
			Data: districtArr,
		})
	default:
		Err(ctx, Resp{
			Message: "Unsupported mode",
		})
	}
}
