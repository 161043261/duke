package api

import (
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
)

type Resp struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

// IsEmpty 通过反射, 判断 resp 是否为空
func (resp Resp) IsEmpty() bool {
	return reflect.DeepEqual(resp, Resp{})
}

func RespOk(ctx *gin.Context, resp Resp) {
	if resp.IsEmpty() {
		ctx.AbortWithStatus(http.StatusOK) // 200
		return
	}
	resp.Code = http.StatusOK
	ctx.AbortWithStatusJSON(resp.Code, resp)
}

func RespErr(ctx *gin.Context, resp Resp) { // * 4xx 客户端错误
	if resp.IsEmpty() {
		ctx.AbortWithStatus(http.StatusNotFound) // 404
		return
	}
	resp.Code = http.StatusNotFound
	ctx.AbortWithStatusJSON(resp.Code, resp)
}
