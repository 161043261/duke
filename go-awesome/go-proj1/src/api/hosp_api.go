package api

import (
	"log"
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

func (hostApi *HospApi) SelectHospByHospCode() {

}

// SelectHospLikeName
// /hosp/likeName/${hospName}
func (hostApi *HospApi) SelectHospLikeName() {

}

// SelectHospByPage
// /hosp/page/${curr}/${limit}?hospLevel=${hospLevel}&districtId=${districtId}
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
	log.Println("mode:", mode)
	switch mode {
	case "level":
	case "district":
		Ok(ctx, Resp{
			Code:    0,
			Message: "",
			Data:    nil,
		})
	default:
		Err(ctx, Resp{
			Message: "Unsupported mode",
		})
	}
	Ok(ctx, Resp{
		Data: gin.H{},
	})
}
